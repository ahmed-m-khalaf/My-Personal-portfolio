import React from 'react';
import { SectionWrapper, ProjectCard } from './index';
import { projects } from '../data/projects';
import { motion } from 'framer-motion';

const Projects = () => {
    return (
        <SectionWrapper id="projects" title="My Projects" subtitle="Featured Work">
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <ProjectCard project={project} />
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
};

export default Projects;
