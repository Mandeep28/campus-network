import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Department from "../components/addons/Department";
import Course from "../components/addons/Course";
import Addcourse from "../components/addons/Addcourse";
import Subject from "../components/addons/Subject";

const Addons = () => {
  const { user } = useState();
  const updateActive = (e) => {
    // console.log(e.target);
    const id = e.target.dataset.id;
    let links = document.querySelectorAll(".link");
    links.forEach((link) => {
      // console.log(link);

      if (link.dataset.id === id) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  return (
    <div>
      <ul className="my-2 pt-2 fs-4 ">

        <li>
          <Link
            to="/addons/department"
            className="link  text-teal active"
            data-id="1"
            onClick={updateActive}
          >
            Department
          </Link>
        </li>
        <li>

          <Link
            to="/addons/course"
            className="link text-teal "
            data-id="2"
            onClick={updateActive}
          >

            Course
          </Link>
        </li>
        <li>

<Link
  to="/addons/subject"
  className="link text-teal "
  data-id="3"
  onClick={updateActive}
>

  Subject
</Link>
</li>
  

      </ul>

      <div className="my-4 pb-3">
        <Routes>
          <Route path="/" element={<Department />} />
          <Route path="/department" element={<Department />} />
          <Route path="/course" element={<Course />} />
          <Route path="/addcourse" element={<Addcourse />} />
          <Route path="/subject" element={<Subject />} />
        </Routes>
      </div>
    </div>
  );
};

export default Addons;
