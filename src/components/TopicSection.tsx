"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { FaAlipay, FaAmazon, FaAws, FaBoxOpen, FaBrain, FaCode, FaDocker, FaGlobe, FaLaravel, FaLinux, FaPhp, FaPython, FaReact, FaSlack, FaSnapchat, FaVenusMars } from 'react-icons/fa'; // Importing some example icons

const topics = [
  { name: 'All', url: '/article', icon: <FaGlobe /> },
  { name: 'Laravel', url: '/article', icon: <FaLaravel /> },
  { name: 'NextJs', url: '/article', icon: <FaReact /> },
  { name: 'React', url: '/article', icon: <FaReact /> },
  { name: 'Idea', url: '/article', icon: <FaBrain /> },
  { name: 'Aws', url: '/article', icon: <FaAws /> },
  { name: 'Linux', url: '/article', icon: <FaLinux /> },
  { name: 'Coding', url: '/article', icon: <FaCode /> },
  { name: 'Python', url: '/article', icon: <FaPython /> },
  { name: 'Docker', url: '/article', icon: <FaDocker /> },
  { name: 'Php', url: '/article', icon: <FaPhp /> },
  { name: 'Swift', url: '/article', icon: <FaAlipay /> },
  { name: 'Vscode', url: '/article', icon: <FaVenusMars /> },
  { name: 'ChatGpt', url: '/article', icon: <FaSnapchat /> },
  { name: 'OpenAI', url: '/article', icon: <FaBoxOpen /> },
  { name: 'Slack', url: '/article', icon: <FaSlack /> },
  // Add more topics as needed
];

const TopicSection = () => {
    const [activeTopic, setActiveTopic] = useState(topics[0].name); // Set default active topic
  
    return (
      <div className='flex items-center gap-2 mb-2 overflow-x-auto whitespace-nowrap'>
        {topics.map((topic, index) => (
          <Link 
            key={index} 
            className={`flex items-center px-3 py-1 rounded-full transition-all ${
              activeTopic === topic.name ? 'bg-gray-500 text-white border-gray-300 animate-out' : 'bg-white text-black border border-gray-300 shadow-sm'
            } hover:shadow-lg active:shadow-sm`}
            href={topic.url}
            onClick={() => setActiveTopic(topic.name)}
          >
            <span className='flex items-center gap-1'>
              {topic.icon}
              {topic.name}
            </span>
          </Link>
        ))}
      </div>
    );
  }
  
  export default TopicSection;