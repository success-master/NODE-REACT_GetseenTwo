// import React, { useState } from "react";
// import ReactDOM from "react-dom";

// import "./ModalTwo.css";

// const ModalTwo = ({ isShown, hide }) => {
//   //   const handleWrapperClick = e => {
//   //     if (e.target.className === "modal-wrapper") {
//   //       return hide();
//   //     }

//   return isShown
//     ? ReactDOM.createPortal(
//         <React.Fragment>
//           <div className="modal-overlay" />
//           <div
//             className="modal-wrapper"
//             aria-modal
//             aria-hidden
//             tabIndex={-1}
//             role="dialog"
//             onClick={hide}
//           >
//             <div className="modal">
//               <div className="modal-header">
//                 <button
//                   type="button"
//                   className="modal-close-button"
//                   data-dismiss="modal"
//                   aria-label="Close"
//                   onClick={
//                     e.target.className === "modal-close-button" ? hide : null
//                   }
//                 >
//                   <span aria-hidden="true">&times;</span>
//                 </button>
//               </div>
//               <p>Hello, I'm a modal.</p>
//             </div>
//           </div>
//         </React.Fragment>,
//         document.getElementById("modal-hook")
//       )
//     : null;
// };
// export default ModalTwo;
