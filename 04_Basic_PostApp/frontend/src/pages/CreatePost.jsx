
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target); // collects image + title + description

    try {
      await axios.post("http://localhost:3000/create-post", formData);
      navigate("/feed"); // go to feed after creating post
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  };

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" required />
        <input type="text" name="description" placeholder="Description" required />
        <input type="file" name="image" accept="image/*" required />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;