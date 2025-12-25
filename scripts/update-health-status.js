/**
 * Update Health Status Script
 * 
 * This script updates the health status in apis.json based on validation results.
 * Run with: node scripts/update-health-status.js
 */

const fs = require('fs');
const path = require('path');
const { validateAPIs } = require('./validate-apis');

async function updateHealthStatus() {
    const apisPath = path.join(__dirname, '../data/apis.json');
    const data = JSON.parse(fs.readFileSync(apisPath, 'utf8'));

    // Run validation
    const results = await validateAPIs();

    // Create a map of results by ID
    const statusMap = new Map();
    [...results.operational, ...results.degraded, ...results.failed].forEach((result) => {
        statusMap.set(result.id, result);
    });

    // Update the APIs
    let updatedCount = 0;
    data.apis = data.apis.map((api) => {
        const result = statusMap.get(api.id);
        if (result) {
            const updates = {
                healthStatus: result.status === 'down' ? 'unknown' : result.status,
                lastChecked: result.checkedAt,
            };

            // Update response time if we got one
            if (result.responseTime) {
                updates.responseTime = result.responseTime;
            }

            // Only update uptime for operational APIs
            if (result.status === 'operational' && api.uptime) {
                // Rolling average (keep 95% of old value, add 5% of new check)
                updates.uptime = Number((api.uptime * 0.95 + 100 * 0.05).toFixed(2));
            } else if (result.status === 'down' && api.uptime) {
                updates.uptime = Number((api.uptime * 0.95 + 0 * 0.05).toFixed(2));
            }

            if (api.healthStatus !== updates.healthStatus) {
                console.log(`${api.name}: ${api.healthStatus} -> ${updates.healthStatus}`);
                updatedCount++;
            }

            return { ...api, ...updates };
        }
        return api;
    });

    // Write back
    fs.writeFileSync(apisPath, JSON.stringify(data, null, 2) + '\n');
    console.log(`\nUpdated ${updatedCount} API health statuses.`);
}

// Run if called directly
if (require.main === module) {
    updateHealthStatus()
        .then(() => {
            console.log('Health status update complete!');
        })
        .catch((error) => {
            console.error('Update failed:', error);
            process.exit(1);
        });
}

module.exports = { updateHealthStatus };
