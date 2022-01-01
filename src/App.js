import { useEffect, useState } from "react";
import Contentstack from "contentstack";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Homepage from "./Pages/Homepage";
import ProductDetails from "./Pages/ProductDetails";
import Products from "./Pages/Products";

const Stack = Contentstack.Stack({
  api_key: "blt380c14e4c6d23425",
  delivery_token: "cs1e03691a7eb82361a53a5f28",
  environment: "production",
});

function App() {
  const Query = Stack.ContentType("homepage").Query();
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState([]);
  const [language, setLanguage] = useState("en-us");

  useEffect(() => {
    console.log("i go in here");
    Query.toJSON()
      .language(language)
      .find()
      .then(function success(result) {
        console.log(result);
        setData(result[0][0].homepage_block);
      });
  }, [language]);

  useEffect(() => {
    const items = data.map((item) => {
      if (item.navbar) {
        return item.navbar.navbar[0];
      }
      if (item.hero) {
        return item.hero.hero[0];
      }
      if (item.featured_products) {
        return item.featured_products.reference[0];
      }
    });
    // console.log(items);
    const id = items.map((item) => {
      return {
        id: item.uid,
        type: item._content_type_uid,
      };
    });

    // console.log(id);

    id.forEach((id) => {
      const Query = Stack.ContentType(id.type).Query();

      Query.where("uid", id.id)
        .toJSON()
        .find()
        .then((res) => {
          setPageInfo((info) => {
            console.log("im the info", info);
            info = [...info, res[0][0]];
            info = info.sort((a, b) => a.order - b.order);
            return info;
          });
        });
    });
  }, [data]);

  console.log(pageInfo);

  if (pageInfo.length > 0) {
    return (
      <div>
        {/* <h1>im the app</h1>
      <button onClick={() => setLanguage("es-ar")}>Choose spanish</button>
      <button onClick={() => setLanguage("en-us")}>Choose english</button> */}
        <Router>
          <Navbar data={pageInfo[0]} />
          <Routes>
            {pageInfo.length > 2 && (
              <Route
                exact
                path='/'
                element={
                  <Homepage data={pageInfo[1]} featuredProducts={pageInfo[2]} />
                }
              ></Route>
            )}
            <Route path={"/products"} exact element={<Products />}></Route>
            <Route
              path={"/products/:id"}
              exact
              element={<ProductDetails />}
            ></Route>
          </Routes>
        </Router>
      </div>
    );
  } else {
    return <></>;
  }
}

export default App;
