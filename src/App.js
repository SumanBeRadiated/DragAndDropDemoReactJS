import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [inputItem, setInputItem] = useState("");
  const [itemList, setItemList] = useState(["apple", "banana", "mango"]);
  const [dragItem, setDragItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);

  return (
    <>
      <div className="container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setItemList([...itemList, inputItem]);
            setInputItem("");
          }}
        >
          <input
            type="text"
            placeholder="eg. carrot"
            value={inputItem}
            onChange={(e) => setInputItem(e.target.value)}
          />
          <input type="submit" value="Enter" />
        </form>
        <div className="item-list flexbox">
          {itemList.map((item, ind) => {
            return (
              <div
                className={`item${dragItem === ind ? " item-on-hold" : ""}`}
                key={ind}
                id={ind}
                draggable={true}
                onDragStart={() => {
                  setDragItem(ind);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  const itemElement = e.target.getBoundingClientRect();
                  // const offsetAbove =
                  //   e.clientY < itemElement.height * 0.25 + itemElement.top;
                  // const offsetBelow =
                  // e.clientY > itemElement.bottom - itemElement.height * 0.25;
                  // const offsetMid =
                  //   e.clientY >= itemElement.top + itemElement.height * 0.25 &&
                  //   e.clientY <= itemElement.bottom - itemElement.height * 0.25;

                  if (e.clientY < itemElement.height * 0.25 + itemElement.top) {
                    e.target.classList.remove("item-border-bottom");
                    e.target.classList.remove("item-hover");
                    e.target.classList.add("item-border-top");
                  } else if (
                    e.clientY >
                    itemElement.bottom - itemElement.height * 0.25
                  ) {
                    e.target.classList.remove("item-border-top");
                    e.target.classList.remove("item-hover");
                    e.target.classList.add("item-border-bottom");
                  } else {
                    e.target.classList.remove("item-border-top");
                    e.target.classList.remove("item-border-bottom");
                    e.target.classList.add("item-hover");
                  }
                }}
                onDragLeave={(e) => {
                  e.target.classList.remove("item-border-top");

                  e.target.classList.remove("item-border-bottom");

                  e.target.classList.remove("item-hover");
                }}
                onDrop={(e) => {
                  e.preventDefault();

                  if (dragItem !== ind) {
                    let x = itemList;
                    const itemElement = e.target.getBoundingClientRect();
                    // const offsetAbove =
                    //   e.clientY < itemElement.height * 0.25 + itemElement.top;
                    // const offsetBelow =
                    // e.clientY > itemElement.bottom - itemElement.height * 0.25;
                    // const offsetMid =
                    // e.clientY >= itemElement.top + itemElement.height * 0.25 &&
                    //   e.clientY <=
                    //     itemElement.bottom - itemElement.height * 0.25;
                    const y = x.splice(dragItem, 1)[0];

                    if (
                      e.clientY <
                      itemElement.height * 0.25 + itemElement.top
                    ) {
                      x.splice(
                        ind === 0 ? 0 : ind < dragItem ? ind : ind - 1,
                        0,
                        y
                      );
                    } else if (
                      e.clientY >
                      itemElement.bottom - itemElement.height * 0.25
                    ) {
                      x.splice(ind > dragItem ? ind : ind + 1, 0, y);
                    } else if (
                      e.clientY >=
                        itemElement.top + itemElement.height * 0.25 &&
                      e.clientY <=
                        itemElement.bottom - itemElement.height * 0.25
                    ) {
                      x.splice(ind, 0, y);
                    }
                    setItemList(x);
                  }
                  setDragItem(null);
                  setDragOverItem(null);
                  e.target.classList.remove("item-border-top");

                  e.target.classList.remove("item-border-bottom");

                  e.target.classList.remove("item-hover");
                }}
                onDragEnd={() => {
                  setDragItem(null);
                  setDragOverItem(null);
                }}
              >
                <i>
                  <ion-icon name="menu-outline"></ion-icon>
                </i>
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <div className="footer">
        Drag and Drop Demo in React.js{" "}
        <i>
          <ion-icon name="logo-react"></ion-icon>
        </i>{" "}
        by{" "}
        <span>
          <a
            href="https://github.com/SumanBeRadiated/DragAndDropDemoReactJS.git"
            target="_blank"
          >
            SumanBeRadiated
            <i>
              <ion-icon name="logo-github"></ion-icon>
            </i>
          </a>
        </span>
      </div>
    </>
  );
}

export default App;
