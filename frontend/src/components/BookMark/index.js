// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const BookMark = () => {
//   const TOKEN = JSON.parse(localStorage.getItem("token"));

//   const [bookMarkTweet, setBookMarkTweet] = useState("");

//   //

//   useEffect(() => {
//     getBookMarkTweet();
//   }, []);

//   const getBookMarkTweet = () => {
//     axios
//       .get("http://localhost:5000/bookMark", {
//         headers: {
//           authorization: "Bearer " + TOKEN,
//         },
//       })
//       .then((result) => {
//         console.log(result, "BookMark Page");
//       })
//       .catch((err) => {
//         console.log(err, "BookMark Error");
//       });
//   };

//   return (
//     <div>
//       <h2>Book Mark Page </h2>

//       <div className="result-Container">
//         <div className="tweetInfo">
//           <div className="test1">
//             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg" />
//             <p> {element.userId.userName} </p>
//           </div>
//           <p>Tweet Body {element.tweetBody}</p>
//         </div>

//         {/* Buttons */}
//       </div>
//     </div>
//   );
// };

// export default BookMark;
