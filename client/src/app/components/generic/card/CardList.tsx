import '../../../styles/scrollbar.css'

export default function CardList({
  items,
  keyField,
  componentKey,
  handleSelection,
  isEditing,
  editItem,
  cardComponent: Card,
}) {

  return (
    <div
      className="d-flex flex-column gap-3 customScrollbar"
      style={{
        padding: "20px",
        background: "#f9f9f9",
        borderRadius: "15px",
        flexGrow: 1,
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      {items.map((item, i) => {
        return (
          <div
            key={i}
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
            }}
          >
            <Card
              item={item}
              isSelected={item[keyField] === componentKey}
              setIsSelected={() => handleSelection(String(item[keyField]))}
              isEditing={isEditing && item[keyField] === componentKey}
              editItem={editItem}
            />
          </div>
        );
      })}
    </div>
  );
}
