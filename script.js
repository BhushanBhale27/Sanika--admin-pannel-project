window.onload = async function () {
  try {
    const response = await axios.get(
      "https://crudcrud.com/api/c3d06be1ebc74d14866955da2ad348d4/sellerProductData"
    );
    const data = response.data;
    const ul1 = document.getElementById("mWear");
    const ul2 = document.getElementById("electron");
    const ul3 = document.getElementById("fashion");
    const ul4 = document.getElementById("toys");

    data.forEach((item) => {
      const li = document.createElement("Li");
      li.textContent = `Price : ${item.price} Product_Name : ${item.productName} selected_Category : ${item.select}`;

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete";
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        detelebutton(item._id, li);
      });
      li.appendChild(deleteBtn);

      if (item.select === "Electronics") {
        ul1.appendChild(li);
      } else if (item.select === "Fashion") {
        ul2.appendChild(li);
      } else if (item.select === "Beauty") {
        ul3.appendChild(li);
      } else if (item.select === "Other") {
        ul4.appendChild(li);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

//delete button functionality
async function detelebutton(id, li) {
  try {
    await axios.delete(
      `https://crudcrud.com/api/c3d06be1ebc74d14866955da2ad348d4/sellerProductData/${id}`
    );
    li.remove();
  } catch (err) {
    console.log(err);
  }
}

//Main code
const mainButton = document.getElementById("btn");
const ul1 = document.getElementById("mWear");
const ul2 = document.getElementById("electron");
const ul3 = document.getElementById("fashion");
const ul4 = document.getElementById("toys");

mainButton.addEventListener("click", async (event) => {
  event.preventDefault();

  const price = document.getElementById("sPrise").value;
  const productName = document.getElementById("productName").value;
  const select = document.getElementById("select").value;

  const obj = {
    price,
    productName,
    select,
  };

  //save on backend(crud) using Axios:-
  try {
    const response = await axios.post(
      "https://crudcrud.com/api/c3d06be1ebc74d14866955da2ad348d4/sellerProductData",
      obj
    );

    //show data on screen:-
    const li = document.createElement("Li");
    li.textContent = `Price : ${response.data.price}  Product : ${response.data.productName}  selected_Category : ${response.data.select}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete";
    deleteBtn.addEventListener("click", () => {
      detelebutton(response.data._id, li);
    });
    li.appendChild(deleteBtn);

    if (obj.select === "Electronics") {
      ul1.append(li);
    } else if (obj.select === "Fashion") {
      ul2.append(li);
    } else if (obj.select === "Beauty") {
      ul3.append(li);
    } else if (obj.select === "Other") {
      ul4.append(li);
    }
  } catch (err) {
    console.log(err);
  }
});
