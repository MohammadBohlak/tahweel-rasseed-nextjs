import { ValidationError, useForm } from "@formspree/react";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import Layout from "../component/Layout";
import { useLoader } from "../../hook/useLoader";
// export const url = "http://localhost:3000";
export const url = "https://alaa-project.vercel.app"

export const getPrice = (value) => value * 1.25;
export const getCost = (value) => value * 1.043;
export default function Customer() {
  // function useLoader() {
  //   const [loader, setLoader] = useState("hidden");
  //   return { loader, setLoader };
  // }; 
  const { loader, setLoader } = useLoader(); 
  const [search, setSearch] = useState("");
  const [state, handleSubmit] = useForm("mqazogok");
  if (state.succeeded) {
    alert("تم الارسال بنجاح");
  }
  const [data, setData] = useState([]);
  // const {loader , setLoader} = useLoader()

  const fetchData = () => {
    setLoader("visible");
    axios
      .get(`${url}/api/posts`)
      .then((res) => {
        let dataOrdered = res.data.sort((a, b) => {
          let nameA = a.name;
          let nameB = b.name;
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        setData(dataOrdered);
      })
      .finally(() => {
        setLoader("hidden");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  async function deleteCustomer(e) {
    let x = window.confirm(`هل أنت متأكد من حذف بيانات ${e.name}  ؟`);
    if (x) {
      setLoader("visible");
      axios
        .delete(`${url}/api/posts/${e._id}`)
        .then(() => {
          fetchData();
        })
        .finally(() => {
          setLoader("hidden");
        });
    }
  }
  let total = data.reduce((acc, curr) => {
    if (!acc[curr.name]) {
      acc[curr.name] = {
        _id: curr._id,
        name: curr.name,
        value: curr.value,
        price: curr.price,
        cost: curr.cost,
      };
    } else {
      acc[curr.name].value += curr.value;
      acc[curr.name].price += curr.price;
      acc[curr.name].cost += curr.cost;
    }
    return acc;
  }, {});
  let uniqueTotal = Object.values(total);
  let dataCompleteSend = "";
  let dataComplete = data.map((e) => {
    let item = `
    الاسم : ${e.name} 
    قيمة الرصيد : ${e.value} 
    السعر: ${e.price}
    التاريخ : ${e.date}
    `;
    dataCompleteSend += item + "\n";
    return e;
  });
  let priceTotal = 0;
  let costTotal = 0;
  let valueTotal = 0;
  let dataNotCompleteSend = "";
  let dataNotComplete = uniqueTotal.map((e) => {
    let item = `
        الاسم : ${e.name} 
        المبلغ الكلي: ${e.price}
        `;
    dataNotCompleteSend += item + "\n";
    priceTotal += e.price;
    costTotal += e.cost;
    valueTotal += e.value;
    return e;
  });
  let countCustomers = uniqueTotal.length;

  const [textAreaData, setTextAreaData] = useState("");
  const [email, setEmail] = useState("abuomarcom4@gmail.com");
  function sendGmail(isComplete) {
    if (isComplete) {
      setTextAreaData(dataCompleteSend);
      // setEmail('abuomarcom4@gmail.com')
    } else {
      setTextAreaData(dataNotCompleteSend);
      // setEmail('abuomarcom4@gmail.com')
    }
  }
  let rmvData = data.filter((e) => {
    return e.name != "رمضان علوش";
  });

  function delelteCustomerData(customer) {
    let OK = confirm(`هل انت متأكد من حذف جميع بيانات ${customer.name}`);
    if (OK) {
      let customerData = data.filter((e) => {
        return customer.name == e.name;
      });
      console.log(customerData);

      customerData.forEach((e) => {
        axios.delete(`${url}/api/posts/${e._id}`).then(() => {
          fetchData();
        });
      });
    }
  }
  let searchData = uniqueTotal.map((e, index) => {
    if (search != "" && e.name.includes(search))
      return (
        <tr key={index} style={{ color: "black" }}>
          <td>{index + 1}</td>
          <td>{e.name}</td>
          <td>{Number(e.price).toFixed(0)}</td>
          <td className="actions-buttons">
            <button
              className="del-btn"
              onClick={() => {
                delelteCustomerData(e);
                setSearch("");
              }}
            >
              حذف
            </button>
          </td>
        </tr>
      );
  });
  return (
    <Layout visible={loader}>
      <div className="add-customer">
        <div>
          <Link href="/customers/addcustomer">
            <button className="add-value-btn">إضافة زبون من حيث الرصيد</button>
          </Link>
        </div>
        <div>
          <Link href="/customers/add-customer-money">
            <button className="add-cost-btn">إضافة زبون من حيث المبلغ</button>
          </Link>
        </div>
      </div>

      <div className="search">
        <input
          type="search"
          placeholder="بحث"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>

      {search != "" && (
        <table className="search-table" dir="rtl">
          <caption className="title-search-table title-table">
            جدول البحث
          </caption>
          <thead>
            <tr>
              <th>م</th>
              <th>الاسم</th>
              <th>السعر</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>{/* todo */ searchData}</tbody>
        </table>
      )}
      <h3 className="title-table">جدول الإحصائيات</h3>

      <table className="table-customers" dir="rtl">
        <thead>
          <tr className="head-table">
            <th>م</th>
            <th>الاسم</th>
            <th>قيمة الرصيد</th>
            <th>السعر</th>
            <th>التكلفة</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {uniqueTotal.map((e, index) => {
            return (
              <tr key={index} style={{ color: "black" }}>
                <td
                  style={{
                    background: "var(--add-color)",
                    color: "white",
                    borderColor: "white",
                  }}
                >
                  {index + 1}
                </td>
                <td>{e.name}</td>
                <td>{e.value}</td>
                <td>{Number(e.price).toFixed(0)}</td>
                <td>{Number(e.cost).toFixed(0)}</td>
                <td style={{ height: "100%" }} className="actions-buttons">
                  <button
                    className="del-btn"
                    onClick={() => {
                      delelteCustomerData(e);
                    }}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table className="table-total">
        <thead>
          <tr>
            <th> </th>
            <th> عدد الزبائن</th>
            <th> الرصيد</th>
            <th> الديون</th>
            <th> الكلفة</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ 
              background: "var(--add-color)",
               color: "white"
                }}>
              المجموع
            </td>
            <td>{countCustomers}</td>
            <td>{valueTotal}</td>
            <td>{priceTotal}</td>
            <td>{costTotal.toFixed(0)}</td>
          </tr>
        </tbody>
      </table>
      <table className="table-customers" dir="rtl">
        <thead>
          <tr className="head-table">
            <th>الاسم</th>
            <th>قيمة الرصيد</th>
            <th>السعر</th>
            <th>التكلفة</th>
            <th>التاريخ</th>
            <th>الحدث المراد</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => {
            return (
              <tr key={e._id}>
                <td>{e.name}</td>
                <td>{e.value}</td>
                <td>{e.price.toFixed(0)}</td>
                <td>{e.cost.toFixed(0)}</td>
                <td>{e.date}</td>
                <td className="actions-buttons">
                  <button
                    onClick={() => {
                      deleteCustomer(e);
                    }}
                  >
                    حذف
                  </button>
                  <Link href={`/customers/edit/${e._id}`}>
                    <button className="edit-btn">تعديل</button>
                  </Link>
                  <Link href={`/customers/add/${e._id}`}>
                    <button className="add-btn">إضافة رصيد</button>
                  </Link>
                  <Link href={`/customers/addcost/${e._id}`}>
                    <button className="add-cost-btn">إضافة مبلغ</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <form onSubmit={handleSubmit} className="gmail-form">
        <div className="desc-buttons">
          <button
            type="button"
            onClick={() => {
              sendGmail(true);
            }}
          >
            إرسال كامل البيانات
          </button>
          <button
            type="button"
            onClick={() => {
              sendGmail(false);
            }}
          >
            إرسال البيانات الإحصائية فقط
          </button>
        </div>
        <div style={{ position: "absolute", visibility: "hidden" }}>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={() => {}}
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>
        <div className="cotainer-textarea">
          <textarea
            id="message"
            name="message"
            value={textAreaData}
            onChange={(e) => {
              setTextAreaData(e.target.value);
            }}
          />
        </div>
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
        <div className="container-submit-btn">
          <button id="submitGmailBtn" type="submit" disabled={state.submitting}>
            إرسال
          </button>
        </div>
      </form>
    </Layout>
  );
}
