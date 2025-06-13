import React from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';
import '../styles/Team.css';

const Team = () => {
  const teamLeader = {
    name: "Prof. Mayank Singh",
    role: "Principal Investigator",
    image: "https://github.com/VenkatReddybathuni/UnityAI-guard-team-images/blob/main/mayank.png?raw=true",
    bio: "Professor at IIT Gandhinagar leading research on toxicity detection and content moderation systems, with expertise in NLP and ethical AI.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/mayank-singh",
      github: "https://github.com/mayanksing",
      email: "mailto:mayank.singh@iitgn.ac.in"
    }
  };

  const teamMembers = [
    {
      name: "Himanshu Beniwal",
      role: "PhD Student, IIT Gandhinagar",
      image: "https://github.com/VenkatReddybathuni/UnityAI-guard-team-images/blob/main/Himanshu.png?raw=true",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/himanshubeniwal/",
        github: "https://github.com/himanshubeniwal",
        email: "mailto:himanshubeniwal@iitgn.ac.in"
      }
    },
    {
      name: "Rohit Kumar",
      role: "BTech. Student, IIT Goa",
      image: "https://github.com/VenkatReddybathuni/UnityAI-guard-team-images/blob/main/rohit.png?raw=true",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/rohit-bansal-/",
        github: "https://github.com/roh8exe",
        email: "mailto:rohit.kumar.23063@iitgoa.ac.in"
      }
    },
    {
      name: "Daksh Jain",
      role: "BTech. Student, IIT Gandhinagar",
      image: "https://github.com/VenkatReddybathuni/UnityAI-guard-team-images/blob/main/DakshJain.png?raw=true",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/dkshjn/",
        github: "https://dkshjn.github.io/portfolio/#header",
        email: "mailto:daksh.jain@iitgn.ac.in"
      }
    },
    {
      name: "Venkat Reddybathuni",
      role: "BTech. Student, IIT Gandhinagar",
      image: "https://github.com/VenkatReddybathuni/UnityAI-guard-team-images/blob/main/ReddybathuniVenkat.png?raw=true",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/reddybathuni-venkat-158364261/",
        github: "https://github.com/VenkatReddybathuni",
        email: "mailto:reddybathuni.venkat@iitgn.ac.in"
      }
    }
  ];

  return (
    <section id="team" className="team-section">
      <div className="team-container">
        <h2 className="team-title">Our Team</h2>
        <p className="team-subtitle">
          Meet the diverse group of experts behind CulturalAI, combining expertise in 
          technology, cultural studies, and human psychology.
        </p>

        {/* Team Leader */}
        <div className="team-leader-container">
          <div className="team-leader-card">
            <div className="team-leader-image">
              <img className="leader-avatar" src={teamLeader.image} alt={teamLeader.name} />
            </div>
            <div className="team-leader-info">
              <h3 className="team-leader-name">{teamLeader.name}</h3>
              <p className="team-leader-role">{teamLeader.role}</p>
              <p className="team-leader-bio">{teamLeader.bio}</p>
              <div className="team-leader-social">
                <a href={teamLeader.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <Linkedin size={18} />
                </a>
                <a href={teamLeader.socialLinks.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                  <Github size={18} />
                </a>
                <a href={teamLeader.socialLinks.email} title="Email">
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="team-members-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member-card">
              <div className="team-member-image">
                <img className="member-avatar" src={member.image} alt={member.name} />
              </div>
              <div className="team-member-info">
                <h3 className="team-member-name">{member.name}</h3>
                <p className="team-member-role">{member.role}</p>
                <div className="team-member-social">
                  <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                    <Linkedin size={16} />
                  </a>
                  <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                    <Github size={16} />
                  </a>
                  <a href={member.socialLinks.email} title="Email">
                    <Mail size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;