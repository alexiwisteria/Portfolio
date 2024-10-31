"use client";

import PropTypes from 'prop-types';
import UseCard from '../UseCard/UsesSection.jsx'; // Importing the UseCard component to display individual items

// UsesSection component - Displays a list of grouped items with titles and descriptions
const UsesSection = ({ items = [] }) => {
  return (
    <section className="flex flex-col p-8">
      <div className="flex flex-col gap-16">
        {/* Loop through each group in the items array */}
        {items.map((group, index) => (
          <div
            key={index} // Key based on array index for unique identification
            className="flex flex-row justify-start gap-8 pl-4 border-l-2 border-gray-200"
          >
            {/* Group header displaying the group name */}
            <h2 className="m-0 text-lg font-bold min-w-[128px]">
              {group.groupName}
            </h2>
            {/* Column of individual items within each group */}
            <div className="flex flex-col gap-8">
              {group.items.map((item, itemIndex) => (
                <UseCard
                  key={itemIndex} // Unique key based on item's index within the group
                  title={item.title} // Pass title as prop to UseCard
                  description={item.description} // Pass description as prop to UseCard
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Define PropTypes for the component to enforce data structure
UsesSection.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      groupName: PropTypes.string.isRequired, // Each group should have a groupName
      items: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired, // Each item should have a title
          description: PropTypes.string, // Optional description for each item
        })
      ).isRequired, // items array within each group is required
    })
  ),
};

// Set default props for the component
UsesSection.defaultProps = {
  items: [], // Default to an empty array if items are not provided
};

export default UsesSection;
