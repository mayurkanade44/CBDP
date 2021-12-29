// import React, { useState } from 'react'
// import { useDataContext } from "../context/data_context";

// export const Email = () => {

//     const {sendEmail} = useDataContext()
//     const [emailId, setEmailId] = useState("");

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       sendEmail(emailId)
//     };
//     return (
//       <div>
//         <form onSubmit={handleSubmit}>
//           <label className="form-label">To Email ID</label>
//           <input
//             type="email"
//             className="form-control"
//             name="email"
//             value={emailId}
//             onChange={(e) => setEmailId(e.currentTarget.value)}
//             required
//           />
//           <button className="btn btn-primary">Send</button>
//         </form>
//       </div>
//     );
// }
