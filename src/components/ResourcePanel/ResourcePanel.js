import React from 'react';
import PropTypes from 'prop-types';
import './ResourcePanel.css';

const ResourcePanel = ({ resource }) => {
    if (!resource) return null; // Do not render if no resource

    return (
        <div className="resource-panel">
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
};

export default ResourcePanel;
