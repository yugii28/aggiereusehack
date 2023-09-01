import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useDisclosure } from "@mantine/hooks";
import { Modal, useMantineTheme } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { Button } from "@mantine/core";

export default function Checkout() {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const [form, setForm] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [modalContent, setModalContent] = useState("");

  async function addCheckout(value) {
    const text = value;
    const b = {
      t: text,
    };
    try {
      await axios.post(`${process.env.REACT_APP_DEV_LINK}/checkout`, b);
      setShowMessage(true);
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
        title="Search for the category"
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        <form onSubmit={() => addCheckout(form)}>
          <TextInput
            placeholder="category..."
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
            Select Category
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
          <button onClick={() => navigate("/check-out-table")}>
            <h1 class="inspect-data">
              INSPECT <br></br>DATA
            </h1>
          </button>
        </div>
        <br></br>
        <h1 className="add-header">DONATE ITEM</h1>
        <button className="delete-button-undo" onClick={() => handleUndo()}>
          Undo
        </button>
        <div className="category-icons">
          {showMessage && <ConfirmationModal />}
          <button onClick={() => addCheckout("BOOK")}>
            <div class="items">
              <img src="book.png"></img>
              <h1>BOOK</h1>
            </div>
          </button>

          <button onClick={(event) => addCheckout("DRESS")}>
            <div class="items">
              <img src="dress.png"></img>
              <h1>DRESS</h1>
            </div>
          </button>

          <button onClick={(event) => addCheckout("HAT")}>
            <div class="items">
              <img src="hat.png"></img>
              <h1>HAT</h1>
            </div>
          </button>

          <button onClick={(event) => addCheckout("HOUSEHOLD SUPPLIES")}>
            <div class="items">
              <img src="household.png"></img>
              <h1>HOUSEHOLD SUPPLIES</h1>
            </div>
            '
          </button>

          <button onClick={(event) => addCheckout("JACKET")}>
            <div class="items">
              <img src="jacket.png"></img>
              <h1>JACKET</h1>
            </div>
          </button>

          <button onClick={(event) => addCheckout("LONG-SLEEVE")}>
            <div class="items">
              <img src="clothes.png"></img>
              <h1>LONG-SLEEVE</h1>
            </div>
          </button>

          <button onClick={(event) => addCheckout("PANTS")}>
            <div class="items">
              <img src="pants.png"></img>
              <h1>PANTS</h1>
            </div>
          </button>

          <button onClick={(event) => addCheckout("RINGS")}>
            <div class="items">
              <img src="diamond-ring.png"></img>
              <h1>RINGS</h1>
            </div>
          </button>

          <button onClick={(event) => addCheckout("SCHOOL SUPPLIES")}>
            <div class="items">
              <img src="stationery.png"></img>
              <h1>SCHOOL SUPPLIES</h1>
            </div>
          </button>

          <button onClick={(event) => addCheckout("SHIRTS")}>
            <div class="items">
              <img src="hawaiian-shirt.png"></img>
              <h1>SHIRTS</h1>
            </div>
          </button>

          <button onClick={(event) => addCheckout("SHOES")}>
            <div class="items">
              <img src="shoes.png"></img>
              <h1>SHOES</h1>
            </div>
          </button>

          <button onClick={(event) => addCheckout("SHORTS")}>
            <div class="items">
              <img src="denim-shorts.png"></img>
              <h1>SHORTS</h1>
            </div>
          </button>

          <button onClick={(event) => addCheckout("SKIRTS")}>
            <div class="items">
              <img src="skirt.png"></img>
              <h1>SKIRTS</h1>
            </div>
          </button>

          <button onClick={(event) => addCheckout("SUNGLASSES")}>
            <div class="items">
              <img src="sunglasses.png"></img>
              <h1>SUNGLASSES</h1>
            </div>
          </button>

          <button onClick={open}>
            <div class="items">
              <img src="apps.png"></img>
              <h1>Search Category</h1>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
