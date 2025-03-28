import React from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import './Achievements.css';

const AchievementCard = ({ title, description, demoLink }) => (
    <Card className="achievement-card-view" style = {{height: "500px"}}>
        <Card.Body>
            <Card.Title className="purple">{title}</Card.Title>
            <Card.Text style={{ textAlign: "justify" }}>
                {description}
            </Card.Text>
            {demoLink && (
                <Button
                    variant="primary"
                    href={demoLink}
                    target="_blank"
                    style={{ marginLeft: "10px" }}
                >
                    <CgWebsite /> &nbsp; Link
                </Button>
            )}
        </Card.Body>
    </Card>
);

export default AchievementCard;