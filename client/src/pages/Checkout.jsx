import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useDisclosure } from "@mantine/hooks";
import { Modal, useMantineTheme } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { Button } from "@mantine/core";
import { Expand } from "@styled-icons/evaicons-solid/Expand";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";

export default function Checkout() {
  const navigate = useNavigate();
  const [showFirstModal, setShowFirstModal] = useState(false);
  const [form, setForm] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [itemName, setItemName] = useState();
  const [secondForm, setSecondForm] = useState();

  async function addCheckout(value) {
    const text = value;
    const b = {
      t: text,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_DEV_LINK}/checkout`,
        b
      );
      setShowMessage(true);
      setModalContent(`${value} added`);
      setTimeout(() => {
        setShowMessage(false); // Hide the "Item added!" message after 3 seconds
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  }

  async function addCustomCheckout(value, number) {
    const text = value;
    const b = {
      itemName: text,
      itemNumber: number,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_DEV_LINK}/checkout/custom`,
        b
      );
      console.log(response);
      setShowMessage(true);
      setModalContent(`${value} added`);
      setTimeout(() => {
        setShowMessage(false); // Hide the "Item added!" message after 3 seconds
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  }

  const undo = () => {
    axios.delete(`${process.env.REACT_APP_DEV_LINK}/undo/checkout/`);
  };

  const handleUndo = () => {
    setShowMessage(true);
    setModalContent("Undo completed");
    setTimeout(() => {
      setShowMessage(false); // Hide the "Item added!" message after 3 seconds
    }, 3000);
    const confirmed = window.confirm(
      "Are you sure you want to undo? Note that once this action is performed, it cannot be reversed"
    );

    if (confirmed) {
      undo();
    }
  };

  const listOfItems = [
    { name: "BOOK", picture: "book.png" },
    { name: "TEXTBOOK", picture: "textbook.png" },
    { name: "DRESS", picture: "dress.png" },
    { name: "JACKET", picture: "jacket.png" },
    { name: "PANTS", picture: "pants.png" },
    { name: "SCHOOL SUPPLIES", picture: "stationery.png" },
    { name: "SHIRTS", picture: "hawaiian-shirt.png" },
    { name: "SHOES", picture: "shoes.png" },
    { name: "SHORTS", picture: "denim-shorts.png" },
    { name: "SKIRTS", picture: "skirt.png" },
    { name: "TANK TOP", picture: "tanktop.png" },
    { name: "ACCESSORIES", picture: "diamond-ring.png" },
    { name: "HOME APPLIANCES", picture: "blender.png" },
    { name: "ELECTRONICS", picture: "electronics.png" },
  ];

  function ConfirmationModal() {
    return (
      <div className="modal">
        <div className="modal-content">
          <h3>{modalContent}</h3>
        </div>
      </div>
    );
  }

  return (
    <div>
      {showFirstModal && (
        <div class="modal-container">
          <div class="modal-content">
            <CloseOutline
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "20px",
                height: "20px",
                cursor: "pointer",
              }}
              onClick={() => setShowFirstModal(false)}
            />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addCheckout(form);
                setShowFirstModal(false);
              }}
            >
              <TextInput
                placeholder="category..."
                label="Category Name"
                withAsterisk
                onChange={(e) => setForm(e.target.value)}
              />
              <br></br>
              <button
                type="submit"
                style={{
                  backgroundColor: "lightgreen",
                  borderRadius: "10%",
                  cursor: "pointer",
                }}
              >
                Add Category
              </button>
            </form>
          </div>
        </div>
      )}

      {showSecondModal && (
        <div class="modal-container">
          <div class="modal-content">
            <CloseOutline
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "20px",
                height: "20px",
                cursor: "pointer",
              }}
              onClick={() => setShowSecondModal(false)}
            />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addCustomCheckout(itemName, secondForm);
                setShowSecondModal(false);
              }}
            >
              <TextInput
                placeholder="category..."
                label={`How many ${itemName} do you want to add?`}
                withAsterisk
                onChange={(e) => setSecondForm(e.target.value)}
              />
              <br></br>
              <Button
                type="submit"
                variant="gradient"
                gradient={{ from: "teal", to: "lime", deg: 105 }}
              >
                Select Category
              </Button>
            </form>
          </div>
        </div>
      )}

      <div class="main-body">
        <div class="navbar-alpha">
          <nav onClick={() => navigate("/")} className="navbar">
            <img
              className="logoImage"
              src="/logo.png"
              size="130"
              width="130"
            ></img>
            <div className="column1">
              <h1 className="heavy">Aggie Reuse Store</h1>
              <h1 className="asucd">ASUCD</h1>
            </div>
          </nav>
          <button onClick={() => navigate("/check-out-table")}>
            <h1 class="inspect-data">
              INSPECT <br></br>CHECKOUT DATA
            </h1>
          </button>
        </div>
        <br></br>
        <div className="text-at-top">
          <h1 className="add-header">DONATE ITEM</h1>
          <button className="delete-button-undo" onClick={() => handleUndo()}>
            Undo
          </button>
        </div>
        <div className="category-icons">
          {showMessage && <ConfirmationModal />}
          {listOfItems.map((item) => (
            <div className="individual-icon">
              <button onClick={() => addCheckout(item.name)}>
                <div class="items">
                  <img src={item.picture}></img>
                  <h1>{item.name}</h1>
                </div>
              </button>
              <button>
                <Expand
                  style={{
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                    color: "white",
                    top: "10px",
                  }}
                  onClick={() => {
                    setShowSecondModal(true);
                    setItemName(item.name);
                  }}
                />
              </button>
            </div>
          ))}
          <button onClick={() => setShowFirstModal(true)}>
            <div class="items">
              <img src="apps.png"></img>
              <h1>Add Category</h1>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
