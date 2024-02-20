import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import baseURL from "../utils/baseURL";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseURL}/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 fullcontent ">
      <BackButton />
      <h1 className="text-3xl my-4 text-center text-gray-300">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex items-center justify-center">
          <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
            <div className="my-4 text-white">
              <span className="text-xl mr-4 text-gray-300">Id</span>
              <span>{book._id}</span>
            </div>
            <div className="my-4 text-white">
              <span className="text-xl mr-4 text-gray-300">Title</span>
              <span>{book.title}</span>
            </div>
            <div className="my-4 text-white">
              <span className="text-xl mr-4 text-gray-300">Author</span>
              <span>{book.author}</span>
            </div>
            <div className="my-4 text-white">
              <span className="text-xl mr-4 text-gray-300">Publish Year</span>
              <span>{book.publishYear}</span>
            </div>
            <div className="my-4 text-white">
              <span className="text-xl mr-4 text-gray-300">Create Time</span>
              <span>{new Date(book.createdAt).toString()}</span>
            </div>
            <div className="my-4 text-white">
              <span className="text-xl mr-4 text-gray-300">
                Last Update Time
              </span>
              <span>{new Date(book.updatedAt).toString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
