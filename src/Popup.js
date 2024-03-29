import React, { useState, useEffect } from 'react';
import './Popup.css'; // Import CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

const schemaOptions = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' }
];

function Popup() {
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [addSchemaDropdownValue, setAddSchemaDropdownValue] = useState('');
  const [savedSegments, setSavedSegments] = useState([]);

  useEffect(() => {
    const savedSegmentsFromLocalStorage = JSON.parse(localStorage.getItem('savedSegments')) || [];
    setSavedSegments(savedSegmentsFromLocalStorage);
  }, []);

  const handleSegmentNameChange = (e) => {
    setSegmentName(e.target.value);
  };

  const handleAddSchemaDropdownChange = (e) => {
    setAddSchemaDropdownValue(e.target.value);
  };

  const handleAddSchemaClick = () => {
    if (addSchemaDropdownValue !== '') {
      setSelectedSchemas([...selectedSchemas, addSchemaDropdownValue]);
      setAddSchemaDropdownValue('');
    } else {
      alert('Please select a schema before adding.');
    }
  };

  const handleRemoveSchema = (index) => {
    const updatedSchemas = [...selectedSchemas];
    updatedSchemas.splice(index, 1);
    setSelectedSchemas(updatedSchemas);
  };

  const renderDropdownOptions = () => {
    return schemaOptions.filter(option => !selectedSchemas.includes(option.value)).map(option => (
      <option key={option.value} value={option.value}>{option.label}</option>
    ));
  };

  const handleSaveSegment = () => {
    if (segmentName.trim() !== '' && selectedSchemas.length > 0) {
      const newSegment = { name: segmentName, schemas: selectedSchemas };
      const updatedSegments = [newSegment, ...savedSegments];
      setSavedSegments(updatedSegments);
      localStorage.setItem('savedSegments', JSON.stringify(updatedSegments));
      setSegmentName('');
      setSelectedSchemas([]);
    } else {
      alert('Please enter a segment name and add at least one schema before saving.');
    }
  };

  const handleDeleteSegment = (index) => {
    const updatedSegments = [...savedSegments];
    updatedSegments.splice(index, 1);
    setSavedSegments(updatedSegments);
    localStorage.setItem('savedSegments', JSON.stringify(updatedSegments));
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Saved Segments:</h3>
        <ul>
          {savedSegments.map((segment, index) => (
            <li key={index}>
              <span>{segment.name}</span>
              <button onClick={() => handleDeleteSegment(index)}>Delete</button>
            </li>
          ))}
        </ul>
        <h3>Enter the name of the segment:</h3>
        <input
          type="text"
          placeholder="Segment Name"
          value={segmentName}
          onChange={handleSegmentNameChange}
        />
        <h3>Add schemas to build the query:</h3>
        <select
          value={addSchemaDropdownValue}
          onChange={handleAddSchemaDropdownChange}
        >
          <option value="">Add schema to segment</option>
          {renderDropdownOptions()}
        </select>
        <button onClick={handleAddSchemaClick}>+ Add new schema</button>
        <div className='indicate'>
          <div className="selected-schemas">
            {selectedSchemas.map((schema, index) => (
              <div key={index} className={`selected-schema ${index === selectedSchemas.length - 1 ? 'last-schema' : index >= selectedSchemas.length - 4 ? 'green-schema' : 'other-schema'}`}>
                {index === selectedSchemas.length - 1 && <span className="dot red"></span>}
                {index !== selectedSchemas.length - 1 && <span className="dot green"></span>}
                <span>{schemaOptions.find(option => option.value === schema).label}</span>
                <FontAwesomeIcon icon={faMinus} onClick={() => handleRemoveSchema(index)} />
              </div>
            ))}
          </div>
        </div>
        <button className="saveButton" onClick={handleSaveSegment}>Save the Segment</button>
        <button className="cancelButton" onClick={() => window.location.href = '/'}>Cancel</button>
      </div>
    </div>
  );
}

export default Popup;
