import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useDisclosure } from "@mantine/hooks";
import { Modal, useMantineTheme } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { Button } from "@mantine/core";

export default function CheckIn() {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const [form, setForm] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [modalContent, setModalContent] = useState("");
  async function addCheckIn(value) {
    const text = value;
    const b = {
      t: text,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_DEV_LINK}/checkin`,
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

  const undo = () => {
    axios.delete(`${process.env.REACT_APP_DEV_LINK}/undo/checkin/`);
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
    {name: "BOOK", picture: "book.png"},
    {name: "TEXTBOOK", picture: "textbook.png"},
    {name: "DRESS", picture: "dress.png"},
    {name: "JACKET", picture: "jacket.png"},
    {name: "PANTS", picture: "pants.png"},
    {name: "SCHOOL SUPPLIES", picture: "stationery.png"},
    {name: "SHIRTS", picture: "hawaiian-shirt.png"},
    {name: "SHOES", picture: "shoes.png"},
    {name: "SHORTS", picture: "denim-shorts.png"},
    {name: "SKIRTS", picture: "skirt.png"},
    {name: "TANK TOP", picture: "tanktop.png"},
    {name: "ACCESSORIES", picture: "diamond-ring.png"},
    {name: "HOME APPLIACNES", picture: "blender.png"},
    {name: "ELECTRONICS", picture: "electronics.png"}
  ]

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
      <Modal
        opened={opened}
        onClose={close}
        title="Enter new category"
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        <form onSubmit={() => addCheckIn(form)}>
          <TextInput
            placeholder="Your name"
            label="Category Name"
            withAsterisk
            onChange={(e) => setForm(e.target.value)}
          />
          <br></br>
          <Button
            type="submit"
            variant="gradient"
            gradient={{ from: "teal", to: "lime", deg: 105 }}
          >
            Add Category
          </Button>
        </form>
      </Modal>
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
          <button onClick={() => navigate("/check-in-table")}>
            <h1 class="inspect-data">
              INSPECT <br></br>DONATION DATA
            </h1>
          </button>
        </div>
        <br></br>
        <div className="text-at-top">
          <h1 className="add-header">ADD ITEM</h1>
          <button className="delete-button-undo" onClick={() => handleUndo()}>
            Undo
          </button>
        </div>
        <div className="category-icons">
          {showMessage && <ConfirmationModal />}
          {listOfItems.map((item) => (
            <button onClick={() => addCheckIn(item.name)}>
              <div class="items">
                <img src= {item.picture}></img>
                <h1>{item.name}</h1>
              </div>
            </button>
          ))}
          <button onClick={open}>
            <div class="items">
              <img src="apps.png"></img>
              <h1>ADD CATEGORY</h1>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
