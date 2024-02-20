import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { HiOutlineViewList, HiOutlineViewGrid } from "react-icons/hi";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";
import baseURL from "../utils/baseURL";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("card");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseURL}/books`)
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="fullcontent p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg flex items-center"
          onClick={() => setShowType("table")}
        >
          <HiOutlineViewList className="text-white mr-2" />
          List
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg flex items-center"
          onClick={() => setShowType("card")}
        >
          <HiOutlineViewGrid className="text-white mr-2" />
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8 text-center text-gray-300">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-300 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
