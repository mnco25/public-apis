export default function SettingsPage() {
  return (
    <div className="min-h-screen animate-fade-in">
      <div className="container-padding py-8">
        <h1 className="text-display-md mb-2">Settings</h1>
        <p className="text-body-lg text-text-secondary mb-8">
          Manage your preferences and account settings.
        </p>

        <div className="max-w-2xl space-y-8">
          {/* Profile Section */}
          <section className="card-base p-6">
            <h2 className="text-h3 mb-4">Profile</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-bg-secondary rounded-full flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <p className="text-body font-medium">Guest User</p>
                <p className="text-body-sm text-text-secondary">
                  Sign in to track your contributions
                </p>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-text-primary text-bg-primary rounded-lg hover:opacity-90 transition-opacity">
              <GitHubIcon />
              Sign in with GitHub
            </button>
          </section>

          {/* Preferences Section */}
          <section className="card-base p-6">
            <h2 className="text-h3 mb-4">Preferences</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between py-2">
                <div>
                  <p className="text-body font-medium">Email Notifications</p>
                  <p className="text-body-sm text-text-secondary">
                    Get notified when APIs you follow change status
                  </p>
                </div>
                <Toggle />
              </label>
              <label className="flex items-center justify-between py-2">
                <div>
                  <p className="text-body font-medium">Weekly Digest</p>
                  <p className="text-body-sm text-text-secondary">
                    Receive a weekly summary of new APIs and updates
                  </p>
                </div>
                <Toggle />
              </label>
            </div>
          </section>

          {/* Stats Section */}
          <section className="card-base p-6">
            <h2 className="text-h3 mb-4">Your Contributions</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-display-md text-text-primary">0</div>
                <div className="text-body-sm text-text-secondary">APIs Added</div>
              </div>
              <div>
                <div className="text-display-md text-text-primary">0</div>
                <div className="text-body-sm text-text-secondary">
                  Validations
                </div>
              </div>
              <div>
                <div className="text-display-md text-text-primary">0</div>
                <div className="text-body-sm text-text-secondary">
                  Issues Reported
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Toggle() {
  return (
    <button
      type="button"
      className="relative inline-flex h-6 w-11 items-center rounded-full bg-bg-tertiary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      role="switch"
      aria-checked="false"
    >
      <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-text-tertiary transition-transform" />
    </button>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 0C4.477 0 0 4.477 0 10C0 14.418 2.865 18.166 6.839 19.489C7.339 19.581 7.521 19.272 7.521 19.007C7.521 18.769 7.513 18.14 7.508 17.306C4.726 17.91 4.139 15.967 4.139 15.967C3.685 14.812 3.029 14.503 3.029 14.503C2.121 13.882 3.098 13.895 3.098 13.895C4.101 13.966 4.629 14.926 4.629 14.926C5.521 16.455 6.97 16.013 7.539 15.756C7.631 15.115 7.889 14.673 8.175 14.42C5.954 14.164 3.62 13.307 3.62 9.477C3.62 8.386 4.009 7.493 4.649 6.794C4.546 6.537 4.203 5.518 4.747 4.147C4.747 4.147 5.587 3.873 7.497 5.163C8.313 4.936 9.16 4.823 10 4.819C10.84 4.823 11.687 4.936 12.503 5.163C14.413 3.873 15.253 4.147 15.253 4.147C15.797 5.518 15.454 6.537 15.351 6.794C15.991 7.493 16.38 8.386 16.38 9.477C16.38 13.317 14.043 14.161 11.816 14.411C12.173 14.723 12.497 15.338 12.497 16.27C12.497 17.602 12.485 18.675 12.485 19.007C12.485 19.274 12.665 19.586 13.173 19.488C17.14 18.163 20 14.417 20 10C20 4.477 15.523 0 10 0Z"
        fill="currentColor"
      />
    </svg>
  );
}
