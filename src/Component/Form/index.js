import React, { useState,useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {addUser, setIsEdit, updateUser} from '../../Redux/formReducer'

const RegistrationForm = () => {
    const dispatch = useDispatch()
    const {users,isEdit,editUserId} = useSelector(state => state.form)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    dob: '',
    phone: '',
    addresses: [''],
    password: '',
    confirmPassword: '',
  });

 useEffect(() => {
    if(isEdit && editUserId){
        const userToEdit = users?.find(user => user.id === editUserId )
        setFormData(userToEdit)
    }
 }, [isEdit,editUserId])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddressChange = (index, value) => {
    const newAddresses = [...formData.addresses];
    newAddresses[index] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      addresses: newAddresses,
    }));
  };

  const handleAddAddress = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      addresses: [...prevFormData.addresses, ''],
    }));
    
  };

  const handleRemoveAddress = (index) => {
    if (formData.addresses.length === 1) return;
    const newAddresses = [...formData.addresses];
    newAddresses.splice(index, 1);
    setFormData((prevFormData) => ({
      ...prevFormData,
      addresses: newAddresses,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
        alert("Password and Confirm Password do not match!");
        return;
      }

    if(isEdit){
        dispatch(updateUser(formData))
        dispatch(setIsEdit(false))
        setFormData({
          name: '',
          age: '',
          dob: '',
          phone: '',
          addresses: [''],
          password: '',
          confirmPassword: '',
        });

    }else{
        const newUser = { ...formData, id: Date.now() };
        dispatch(addUser(newUser));
        setFormData({
          name: '',
          age: '',
          dob: '',
          phone: '',
          addresses: [''],
          password: '',
          confirmPassword: '',
        });
    }


  };

  return (
    <div className="App">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name*</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            maxLength={20}
            required
            pattern="^[A-Za-z\s]+$"
            title="Name must be alphabetic characters only."
          />
        </div>
        <div>
          <label htmlFor="age">Age*</label>
          <input
            type="number"
            name="age"
            id="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="dob">Date of birth*</label>
          <input
            type="date"
            name="dob"
            id="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone number*</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="[0-9]{8,10}"
            title="Phone number must be numeric and 8-10 digits long."
          />
        </div>
        {formData.addresses.map((address, index) => (
          <div key={index}>
            <label htmlFor={`address${index}`}>Address {index + 1}*</label>
            <input
              type="text"
              name={`address${index}`}
              id={`address${index}`}
              value={address}
              onChange={(e) => handleAddressChange(index, e.target.value)}
              required
            />
            {index === 0 ? (
              <button type="button" onClick={handleAddAddress}>
                (+) Add More Address
              </button>
            ) : (
              <button type="button" onClick={() => handleRemoveAddress(index)}>
                (-) Remove Address
              </button>
            )}
          </div>
        ))}
        <div>
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            minLength={10}
            required
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{10,}$"
            title="Password must be at least 10 characters long and contain at least one special character and one uppercase letter."
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm password*</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{isEdit ? 'Update' : 'Submit'}</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
