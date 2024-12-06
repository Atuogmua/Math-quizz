import React from 'react';
import PropTypes from 'prop-types';
import './ResourcePanel.css';

const ResourcePanel = ({ resource, onClose }) => {
    if (!resource) return null; // Do not render if no resource

    return (
        <div className="resource-panel">
            <button className="close-button" onClick={onClose}>X</button> {/* Close button */}
            <div className="resource-preview">
                <iframe
                    src={resource.url}
                    title={resource.title}
                    frameBorder="0"
                    className="resource-iframe"
                />
            </div>
        </div>
    );
};

ResourcePanel.propTypes = {
    resource: PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }),
    onClose: PropTypes.func.isRequired, // Function to handle the close action

};

export default ResourcePanel;