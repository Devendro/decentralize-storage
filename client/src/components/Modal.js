import { useEffect } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    setModalOpen(false);
  };

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title" style={{color: "black"}}>
          Share with
          <div className="titleCloseBtn">
            <button onClick={() => setModalOpen(false)}>×</button>
          </div>
        </div>
        <div className="body">
          <input type="text" className="address-share" placeholder="Enter Address" />
          <form id="myForm">
            <select id="selectNumber">
              <option className="address">People With Access</option>
            </select>
          </form>
        </div>
        <div className="footer">
          <button onClick={() => setModalOpen(false)} id="cancelBtn">
            Cancel
          </button>
          <button onClick={sharing}>Share</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
