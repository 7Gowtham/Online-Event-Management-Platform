import React, { useState } from 'react';
import EventCard from './common/EventCard';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function CreateEvent() {
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState(null); 
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('');

  const allowedExtensions = ['png', 'jpg', 'jpeg'];

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (imageFile && imageFile.size > 3 * 1024 * 1024) {
      toast.error('Choose file of less size');
      return;
    }

    try {
      let { message } = await AxiosService.post(
        ApiRoutes.CREATE_EVENT.path,
        { title, description, image, location, date, time, category },
        { authenticate: ApiRoutes.CREATE_EVENT.auth }
      );
      toast.success(message);
      navigate('/home');
    } catch (error) {
      toast.error(error.message || 'Internal Server Error');
    }
  };

  const validateExtension = (name) => {
    const extension = name.split('.')[name.split('.').length - 1];
    return allowedExtensions.includes(extension);
  };

  const selectFile = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 3 * 1024 * 1024) {
        toast.error('Choose file of less size');
        return;
      }

      if (validateExtension(selectedFile.name)) {
        let reader = new FileReader();

        reader.readAsDataURL(selectedFile);

        reader.onload = () => {
          setImage(reader.result);
          setImageFile(selectedFile); 
        };
      } else {
        toast.error(`Only file types of ${allowedExtensions.join(',')} are allowed`);
      }
    }
  };

  return (
    <>
      <div className="p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Create Event</h2>
        <div className="flex flex-col lg:flex-row justify-between items-start p-8 space-y-8 lg:space-y-0 lg:space-x-8">
          <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
            <form className="space-y-6">
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Enter Title"
                  className="border border-gray-300 p-2 rounded-md"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">Image</label>
                <input
                  type="file"
                  className="border border-gray-300 p-2 rounded-md"
                  onChange={selectFile}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">Description</label>
                <textarea
                  placeholder="Write your thoughts!"
                  className="border border-gray-300 p-2 rounded-md h-28"
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">Location</label>
                <input
                  type="text"
                  placeholder="Enter Location"
                  className="border border-gray-300 p-2 rounded-md"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">Date</label>
                <input
                  type="date"
                  className="border border-gray-300 p-2 rounded-md"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">Time</label>
                <input
                  type="time"
                  className="border border-gray-300 p-2 rounded-md"
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">Category</label>
                <input
                  type="text"
                  placeholder="Enter Category"
                  className="border border-gray-300 p-2 rounded-md"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="w-full bg-blue-500 text-white p-2 rounded-md"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>

          <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-center text-xl font-semibold mb-6">Preview</h3>
            <EventCard
              title={title}
              description={description}
              image={image}
              location={location}
              date={date}
              time={time}
              category={category}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateEvent;
