/**
 * API Validation Script
 * 
 * This script checks the health of all APIs in the registry.
 * Run with: node scripts/validate-apis.js
 */

const fs = require('fs');
const path = require('path');

const TIMEOUT_MS = 10000; // 10 second timeout
const MAX_CONCURRENT = 5; // Max concurrent requests

async function checkAPI(api) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
        const startTime = Date.now();
        const response = await fetch(api.baseUrl, {
            method: 'HEAD', // Use HEAD for faster checks
            signal: controller.signal,
            headers: {
                'User-Agent': 'PublicAPIs-HealthChecker/1.0',
            },
        });
        clearTimeout(timeoutId);

        const responseTime = Date.now() - startTime;

        return {
            id: api.id,
            name: api.name,
            baseUrl: api.baseUrl,
            status: response.ok ? 'operational' : response.status >= 500 ? 'degraded' : 'operational',
            httpStatus: response.status,
            responseTime,
            checkedAt: new Date().toISOString(),
        };
    } catch (error) {
        clearTimeout(timeoutId);

        // If HEAD fails, try GET
        try {
            const startTime = Date.now();
            const response = await fetch(api.baseUrl, {
                method: 'GET',
                signal: AbortSignal.timeout(TIMEOUT_MS),
                headers: {
                    'User-Agent': 'PublicAPIs-HealthChecker/1.0',
                },
            });
            const responseTime = Date.now() - startTime;

            return {
                id: api.id,
                name: api.name,
                baseUrl: api.baseUrl,
                status: response.ok ? 'operational' : 'degraded',
                httpStatus: response.status,
                responseTime,
                checkedAt: new Date().toISOString(),
            };
        } catch (retryError) {
            return {
                id: api.id,
                name: api.name,
                baseUrl: api.baseUrl,
                status: 'down',
                error: retryError.name === 'AbortError' ? 'Timeout' : retryError.message,
                checkedAt: new Date().toISOString(),
            };
        }
    }
}

async function validateAPIs() {
    const apisPath = path.join(__dirname, '../data/apis.json');
    const data = JSON.parse(fs.readFileSync(apisPath, 'utf8'));
    const apis = data.apis;

    console.log(`Validating ${apis.length} APIs...`);

    const results = {
        checked: new Date().toISOString(),
        total: apis.length,
        operational: [],
        degraded: [],
        failed: [],
    };

    // Process in batches to avoid overwhelming
    for (let i = 0; i < apis.length; i += MAX_CONCURRENT) {
        const batch = apis.slice(i, i + MAX_CONCURRENT);
        const batchResults = await Promise.all(batch.map(checkAPI));

        for (const result of batchResults) {
            if (result.status === 'operational') {
                results.operational.push(result);
            } else if (result.status === 'degraded') {
                results.degraded.push(result);
            } else {
                results.failed.push(result);
            }
            console.log(`[${result.status.toUpperCase()}] ${result.name} - ${result.responseTime || result.error || 'N/A'}ms`);
        }
    }

    console.log('\n--- Summary ---');
    console.log(`Operational: ${results.operational.length}`);
    console.log(`Degraded: ${results.degraded.length}`);
    console.log(`Failed: ${results.failed.length}`);

    return results;
}

// Run if called directly
if (require.main === module) {
    validateAPIs()
        .then((results) => {
            console.log(JSON.stringify(results, null, 2));
        })
        .catch((error) => {
            console.error('Validation failed:', error);
            process.exit(1);
        });
}

module.exports = { validateAPIs, checkAPI };
