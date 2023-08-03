"use client";
import useAddress from "@/app/hooks/use-address";
import useCart from "@/app/hooks/use-cart";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import { useSession } from "next-auth/react";

export default function Pagepdf() {
  // const { data } = useSession();
  // console.log(data);
  // const user = data.user;
  const items = useCart((state) => state.items);
  const address = useAddress((state) => state.address);
  console.log(items);
  const currentDate = new Date().toLocaleDateString("es-MX");
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      backgroundColor: "#ffffff",
      padding: "1cm",
      paddingTop: 0,
    },
    section: {
      marginBottom: "1cm",
    },
    productName: {
      fontSize: "12pt",
      fontWeight: "bold",
      marginBottom: "5pt",
    },
    productImage: {
      width: "80px",
      height: "60px",
      marginBottom: "5pt",
    },
    address: {
      fontSize: "12pt",
      marginBottom: "10pt",
    },
    table: {
      display: "table",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
    },
    tableColHeader: {
      width: "25%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "12pt",
      textAlign: "center",
      fontWeight: "bold",
    },
    tableColHeaderp: {
      width: "10%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "12pt",
      textAlign: "center",
      fontWeight: "bold",
    },
    tableColHeadern: {
      width: "45%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "12pt",
      textAlign: "center",
      fontWeight: "bold",
    },
    tableCol: {
      width: "25%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "10pt",
      textAlign: "center",
    },
    tableColp: {
      width: "10%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "10pt",
      textAlign: "center",
    },
    tableColn: {
      width: "45%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "10pt",
      textAlign: "center",
    },
    image: {
      width: "180px",
      height: "120px",
      textAlign: "center",
    },
    footer: {
      position: "absolute",
      bottom: "1cm",
      left: 0,
      right: 0,
      textAlign: "center",
      fontSize: "10pt",
      color: "gray",
    },
  });

  const PDFComponent = ({ data }) => (
    // <Document>
    //   <Page size="A4" style={styles.page}>
    //     <View style={styles.section}>
    //       <Image
    //         src={"/images/logos/logo_grupo_regio.png"}
    //         style={styles.image}
    //         alt="logo grupo regio"
    //       />
    //       {data.map((item) => (
    //         <Text key={item.id}>{item.nameProduct}</Text>
    //       ))}
    //       <Text>{address.officeName}</Text>
    //       <Text>
    //         {address.address}, {address.city}, {address.state},{" "}
    //         {address.country}, CP. {address.postalCode}
    //       </Text>
    //     </View>
    //   </Page>
    // </Document>

    <Document>
      <Page size="A4" style={styles.page}>
        <Image
          src={"/images/logos/logo_grupo_regio.png"}
          style={styles.image}
          alt="logo grupo regio"
        />
        <View style={styles.address}>
          <Text>Fecha del pedido: {currentDate}</Text>
        </View>
        <View style={styles.address}>
          {/* <Text>Pedido por: {user}</Text> */}
        </View>
        <Text style={styles.address}>
          Dirección de envío: {address.officeName}
        </Text>
        <Text style={styles.address}>
          {address.address}, {address.city}, {address.state}, {address.country},
          CP. {address.postalCode}
        </Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text>Producto</Text>
            </View>
            <View style={styles.tableColHeadern}>
              <Text>Nombre</Text>
            </View>
            <View style={styles.tableColHeaderp}>
              <Text>Cajas</Text>
            </View>
            <View style={styles.tableColHeaderp}>
              <Text>Precio</Text>
            </View>
            <View style={styles.tableColHeaderp}>
              <Text>Total</Text>
            </View>
          </View>
          {data.map((producto) => (
            <View key={producto.id} style={styles.tableRow}>
              <View style={styles.tableCol}>
                {/* <Text style={styles.productName}>{producto.nameProduct}</Text> */}
                <Image
                  src={producto.imageProduct}
                  style={styles.productImage}
                />
              </View>
              <View style={styles.tableColn}>
                <Text>{producto.nameProduct}</Text>
              </View>
              <View style={styles.tableColp}>
                <Text>{producto.quantity}</Text>
              </View>
              <View style={styles.tableColp}>
                <Text>${producto.priceLocal} MXN</Text>
              </View>
              <View style={styles.tableColp}>
                <Text>${producto.priceLocal * producto.quantity} MXN</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.footer}>
          <Text>Grupo Regio</Text>
        </View>
      </Page>
    </Document>
  );
  return (
    <div>
      <h1>PDF Generation Example</h1>
      {/* {console.log(items)} */}
      <PDFViewer style={{ width: "100%", height: "500px" }}>
        <PDFComponent data={items} />
      </PDFViewer>
    </div>
  );
}
