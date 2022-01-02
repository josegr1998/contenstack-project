import { useEffect, useState } from "react";
import Contentstack from "contentstack";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Homepage from "./Pages/Homepage";
import ProductDetails from "./Pages/ProductDetails";
import Products from "./Pages/Products";
import Stack from "./Client/Client";
import About from "./Pages/About";
import { useAppContext } from "./Context/Context";
import Cart from "./Components/Cart";
import Footer from "./Components/Footer";

function App() {
  const Query = Stack.ContentType("homepage").Query();
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState([]);
  const [language, setLanguage] = useState("en-us");
  const { setAllProducts } = useAppContext();

  useEffect(() => {
    Query.toJSON()
      .language(language)
      .find()
      .then(function success(result) {
        setData(result[0][0].homepage_block);
      });
  }, [language]);

  useEffect(() => {
    if (data.length > 0) {
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
        if (item.cart) {
          return item.cart.cart[0];
        }
        if (item.footer) {
          return item.footer.footer[0];
        }
      });

      const id = items.map((item) => {
        return {
          id: item.uid,
          type: item._content_type_uid,
        };
      });

      id.forEach((id) => {
        const Query = Stack.ContentType(id.type).Query();

        Query.where("uid", id.id)
          .toJSON()
          .find()
          .then((res) => {
            setPageInfo((info) => {
              info = [...info, res[0][0]];
              info = info.sort((a, b) => a.order - b.order);
              return info;
            });
          });
      });
    }
  }, [data]);

  useEffect(() => {
    const Query = Stack.ContentType("ui_product").Query();
    Query.toJSON()
      .find()
      .then((res) => {
        setAllProducts(res[0]);
      });
  }, []);

  console.log(pageInfo);

  if (pageInfo.length > 0) {
    return (
      <div>
        {/* <h1>im the app</h1>
      <button onClick={() => setLanguage("es-ar")}>Choose spanish</button>
      <button onClick={() => setLanguage("en-us")}>Choose english</button> */}
        <Router>
          <Navbar data={pageInfo[0]} />
          {pageInfo.length > 3 && <Cart data={pageInfo[3]} />}

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
            <Route path='/about' exact element={<About />}></Route>
          </Routes>
          {pageInfo.length > 4 && <Footer data={pageInfo[4]} />}
        </Router>
      </div>
    );
  } else {
    return <></>;
  }
}

export default App;
