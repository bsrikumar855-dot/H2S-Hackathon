import { Link } from "react-router-dom"

export default function ProfilePage() {
  return (
    <div className="p-xl max-w-4xl mx-auto flex flex-col gap-xl">
      <div className="flex items-center gap-md mb-md">
        <Link to="/dashboard" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-high transition-colors text-on-surface-variant">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">Recruiter Profile</h1>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-xl flex flex-col md:flex-row gap-xl items-start">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-md shrink-0 bg-secondary-container">
          <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Alexander Reed</h2>
              <p className="font-title-md text-title-md text-on-surface-variant mt-xs">Lead Technical Recruiter at TechCorp</p>
            </div>
            <button className="bg-primary text-on-primary px-lg py-sm rounded-lg font-label-md hover:shadow-md transition-shadow">
              Edit Profile
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-md mt-xl">
            <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant">
              <span className="text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider">Email</span>
              <p className="font-body-lg text-body-lg text-on-surface mt-xs">alexander.reed@techcorp.com</p>
            </div>
            <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant">
              <span className="text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider">Phone</span>
              <p className="font-body-lg text-body-lg text-on-surface mt-xs">+1 (555) 123-4567</p>
            </div>
            <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant">
              <span className="text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider">Location</span>
              <p className="font-body-lg text-body-lg text-on-surface mt-xs">San Francisco, CA</p>
            </div>
            <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant">
              <span className="text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider">Timezone</span>
              <p className="font-body-lg text-body-lg text-on-surface mt-xs">Pacific Time (PT)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl border border-outline-variant p-xl">
          <h3 className="font-title-lg text-title-lg font-bold text-on-surface mb-lg">Recent Activity</h3>
          <div className="space-y-md">
            {[
              { action: "Reviewed candidate", target: "Jane Doe", time: "2 hours ago", icon: "visibility" },
              { action: "Shortlisted", target: "John Smith", time: "5 hours ago", icon: "star" },
              { action: "Created job post", target: "Senior Frontend Engineer", time: "1 day ago", icon: "work" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-md p-md rounded-xl hover:bg-surface-container-low transition-colors">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined text-sm">{activity.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="font-body-md text-body-md text-on-surface"><span className="font-bold">{activity.action}</span> - {activity.target}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-xl">
          <h3 className="font-title-lg text-title-lg font-bold text-on-surface mb-lg">Stats</h3>
          <div className="flex flex-col gap-md">
            <div className="flex justify-between items-center p-md bg-surface-container rounded-xl">
              <span className="font-body-md text-on-surface-variant">Active Jobs</span>
              <span className="font-title-lg font-bold text-primary">12</span>
            </div>
            <div className="flex justify-between items-center p-md bg-surface-container rounded-xl">
              <span className="font-body-md text-on-surface-variant">Candidates Reviewed</span>
              <span className="font-title-lg font-bold text-primary">843</span>
            </div>
            <div className="flex justify-between items-center p-md bg-surface-container rounded-xl">
              <span className="font-body-md text-on-surface-variant">Hires Made</span>
              <span className="font-title-lg font-bold text-primary">47</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
