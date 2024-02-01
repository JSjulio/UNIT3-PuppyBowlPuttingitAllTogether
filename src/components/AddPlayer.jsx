//AddPlayer.jsx 
import { useCreatePlayerMutation } from "../../API/mainAPI"
import { useState } from "react"; 


export default function AddPlayer() { 

    //called the register mutation, and destructured the isLoading and
    //error objects to seamlessly gain access to their values 
    const [ register, {isLoading, error }] = useCreatePlayerMutation();
    
    //State is now tracking form data, it is initially set to an empty string  
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        status: '', // will be either 'field' or 'bench' 
        imageUrl: '' 
    });

    // event handler changes form state (formData) to the input of the user 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit action
    try {
      // const response calls the register mutation function with the form data
      const response = await register(formData).unwrap(); // Unwrap the response
      console.log('Registration successful:', response); // Log the response data

      // If the mutation is successful, you can clear the form or navigate to another page
      setFormData({ name: '', breed: '', status: '', imageUrl: '' });
    } catch (err) {
      // Handle the error if the mutation fails
      console.error('Failed to register player:', err);
    }
  };


  return (
  <>
      <h2>Welcome to the Unit3 Puppy Bowl</h2>
      <h3>Fillout this form to add your player!</h3>

    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input name="name" value={formData.name} onChange={handleChange} minLength={5} autoComplete="name" required />
      </label>
      <label>
        Breed:
        <input name="breed" value={formData.breed} onChange={handleChange} autoComplete="breed" required />
      </label>
      <label>
      Status:
        <select name="status" value={formData.status} onChange={handleChange} required> 
            <option value="" disabled> Select Status</option>
                <option value="field">Field</option>
                <option value="bench">Bench</option>
        </select>
      </label>
      <label>
        Image URL:
        <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} autoComplete="imageUrl" required />
      </label>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
    </>
  );
}