import React, { useEffect, useState } from "react";
import "../../styles/additionalFeature.css";
import { MinusCircleOutlined } from '@ant-design/icons';

const AddFeature = ({ setPropertiesFields }) => {
	const initialFeatures = ["Landscaped Parks with picnic grounds"];
	const initialIncludes = ["Living Room with Dining Area"];

	const [features, setFeatures] = useState(initialFeatures);
	const [includes, setIncludes] = useState(initialIncludes);
	const [selectedFeatures, setSelectedFeatures] = useState([]);
	const [selectedIncludes, setSelectedIncludes] = useState([]);
	const [newFeature, setNewFeature] = useState("");
	const [newInclude, setNewInclude] = useState("");
	const [addingFeature, setAddingFeature] = useState(false);
	const [addingInclude, setAddingInclude] = useState(false);

	const addNewItem = (item, setItems, setNewItem, setAdding, category) => {
		if (item.trim()) {
			setItems((prevItems) => [...prevItems, item]);
			setNewItem("");
			setAdding(false);
			setPropertiesFields((prevFields) => ({
				...prevFields,
				amenities: {
					...prevFields.amenities,
					[category]: [...prevFields.amenities[category], item],
				},
			}));
		}
	};

	const removeItem = (index, setItems, category) => {
		setItems((prevItems) => {
			const updatedItems = prevItems.filter((_, i) => i !== index);
			// Update the property fields based on the category
			setPropertiesFields((prevFields) => ({
				...prevFields,
				amenities: {
					...prevFields.amenities,
					[category]: updatedItems,
				},
			}));
			return updatedItems;
		});
	};

	useEffect(() => {
		console.log("Features:", features);
		console.log("Includes:", includes);
	}, [features, includes]);

	useEffect(() => {
		setPropertiesFields({
			amenities: {
				custom_amenities: { feature_name: features },
				custom_inclusion: { inclusion_name: includes },
			},
		});
	}, [features, includes, setPropertiesFields]);

	return (
		<div className="AddFeature">
			<FeatureList
				title="Features and Amenities"
				items={features}
				selectedItems={selectedFeatures}
				setSelectedItems={setSelectedFeatures}
				newItem={newFeature}
				setNewItem={setNewFeature}
				addingItem={addingFeature}
				setAddingItem={setAddingFeature}
				addNewItem={() =>
					addNewItem(
						newFeature,
						setFeatures,
						setNewFeature,
						setAddingFeature,
						"custom_amenities"
					)
				}
				removeItem={(index) =>
					removeItem(index, setFeatures, "custom_amenities")
				}
			/>
			<FeatureList
				title="Includes"
				items={includes}
				selectedItems={selectedIncludes}
				setSelectedItems={setSelectedIncludes}
				newItem={newInclude}
				setNewItem={setNewInclude}
				addingItem={addingInclude}
				setAddingItem={setAddingInclude}
				addNewItem={() =>
					addNewItem(
						newInclude,
						setIncludes,
						setNewInclude,
						setAddingInclude,
						"custom_inclusion"
					)
				}
				removeItem={(index) =>
					removeItem(index, setIncludes, "custom_inclusion")
				}
			/>
		</div>
	);
};

const FeatureList = ({
	title,
	items,
	selectedItems,
	newItem,
	setNewItem,
	addingItem,
	setAddingItem,
	addNewItem,
	removeItem,
}) => (
	<div className="addFeatureList">
		<div className="top">
			<div className="titles">
				<h2>{title}</h2>
				<p>Enter text that is not found in the options above</p>
			</div>
			{!addingItem && (
				<button className="add-button" onClick={() => setAddingItem(true)}>
					Add +
				</button>
			)}
		</div>
		<div className="features">
			{items.map((item, index) => (
				<ul key={index}>
					<li>
						<div className="feature-item-container">
							<span
								className={`feature-item ${
									selectedItems.includes(item) ? "selected" : ""
								}`}
							>
								{item}
							</span>
							<button onClick={() => removeItem(index)}>
								<MinusCircleOutlined
									style={{ fontSize: "24px", color: "#d90000" }}
								/>
							</button>
						</div>
					</li>
				</ul>
			))}
			{addingItem && (
				<div className="add-new-item">
					<input
						type="text"
						value={newItem}
						onChange={(e) => setNewItem(e.target.value)}
						placeholder={`Enter text that is not found in the options above`}
						onBlur={addNewItem}
						autoFocus
					/>
				</div>
			)}
		</div>
	</div>
);

export default AddFeature;
