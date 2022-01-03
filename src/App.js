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
  const [global, setGlobal] = useState("");
  const [pageInfo, setPageInfo] = useState([]);
  const { setAllProducts, changeLanguage, language } = useAppContext();

  useEffect(() => {
    if (language === "en-us") {
      Query.toJSON()
        .language(language)
        .find()
        .then(function success(result) {
          setData(result[0][0].homepage_block);
          setGlobal(result[0][0].global_field);
        });
    }
    if (language === "es-ar") {
      Query.toJSON()
        .language(language)
        .find()
        .then((res) => {
          console.log(res);
          setData(res[0][0].homepage_block);
          setGlobal(res[0][0].global_field);
        });
    }
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

      console.log("im the english id", id);

      id.forEach((id) => {
        const Query = Stack.ContentType(id.type).Query();

        Query.where("uid", id.id)
          .language(language)
          .toJSON()
          .find()
          .then((res) => {
            setPageInfo((info) => {
              info = [...info, res[0][0]];

              info = info.sort((a, b) => a.order - b.order);

              if (language === "es-ar") {
                info = info.filter((item) => {
                  if (item.locale === "es-ar") {
                    return item;
                  }
                });
              }
              if (language === "en-us") {
                info = info.filter((item) => {
                  if (item.locale === "en-us") {
                    return item;
                  }
                });
              }
              console.log("im the english info thats not working", info);
              return info;
            });
          });
      });
    }
  }, [data]);

  console.log("im global", global);

  useEffect(() => {
    const Query = Stack.ContentType("ui_product").Query();
    Query.language(language)
      .toJSON()
      .find()
      .then((res) => {
        setAllProducts(res[0]);
      });
  }, [language]);

  console.log(pageInfo);

  if (
    (pageInfo.length > 4 && language === "en-us") ||
    (pageInfo.length > 4 && language === "es-ar")
  ) {
    return (
      <div>
        {/* <h1>im the app</h1>
        <button
          onClick={() => {
            changeLanguage("es-ar");
          }}
        >
          Choose spanish
        </button>
        <button onClick={() => changeLanguage("en-us")}>Choose english</button> */}
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
            <Route
              path={"/products"}
              exact
              element={<Products data={global} />}
            ></Route>
            <Route
              path={"/products/:id"}
              exact
              element={<ProductDetails data={global} />}
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
