import React from 'react';
import AchievementCard from './AchievementCard';
import './Achievements.css';
import Particle from "../Particle";

const Achievements = () => {
    return (
        <div className="achievements-container">
            <Particle />
            <h1>My <span className='purple'>Achievements</span></h1>
            <div className="achievements-list">
                <AchievementCard
                    title="U-PASS+ Transit Platform Recognition"
                    description="Spearheaded the development of the U-PASS+ transit enrollment platform at the University of Illinois Chicago, facilitating seamless access to public transit for over 50,000 students. The platform’s success garnered approximately $3 million in funding for the university and was highlighted in the Cook County Chronicle for significantly improving student accessibility and satisfaction."
                    demoLink="https://chronicleillinois.com/news/cook-county-news/cta-metra-pass-for-uic-students-beats-expectations/"
                />
                <AchievementCard
                    title="Winner of Epic x UIC Hackathon"
                    description="Won the Epic x UIC Hackathon with a data-driven project examining the correlation between hormone replacement therapy and breast cancer. Utilized the Cosmos dataset with over 270 million patient records to draw meaningful insights, showcasing the potential of data analytics in healthcare."
                />
                <AchievementCard
                    title="Technocrats - National Level Hackathon Finalists"
                    description="Participated as a team (Technocrats) in the NMIT Hackathon, advancing through all rounds with 'Unspoken Health.' This intensive event combined continuous coding, research, and solution design, resulting in a unique model praised for its mental health focus."
                />
                <AchievementCard
                    title="Publication on Counterfeit Medicine Authentication Using Blockchain"
                    description="Published a paper titled 'An Effective Counterfeit Medicine Authentication System Using Blockchain Technology and IoT to Prevent Hazards to Human Life' at the 4th International Conference of Emerging Technology (INCET 2023). The paper explores a blockchain-based solution to combat counterfeit medicines."
                />
            </div>
        </div>
    );
};

export default Achievements;