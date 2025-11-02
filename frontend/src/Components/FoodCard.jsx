import axios from "axios";
import { toast } from "react-toastify";

function FoodCard({ food }) {
  const handleAddFood = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/profile/add-food",
        {
          name: food.name,
          calories: food.calories,
          category: food.category,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(`${food.name} added to your profile!`);
      console.log(res.data.profile);
    } catch (err) {
      toast.error("Failed to add food");
      console.error(err);
    }
  };

  return (
    <div className="food-card" onClick={handleAddFood}>
      <img src={food.image} alt={food.name} />
      <h3>{food.name}</h3>
      <p>{food.calories} cal</p>
      <p>{food.category}</p>
    </div>
  );
}

export default FoodCard;
