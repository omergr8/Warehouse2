import React, { Component } from "react";
import axios from "axios";
import arrowImage from "../../assets/arrow.png";
import "./mapping.css";
import "@grapecity/wijmo.styles/wijmo.css";
import * as wjNav from "@grapecity/wijmo.react.nav";
import * as wjCore from "@grapecity/wijmo";
class Mappings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   you can write any property in this array objects , like key,
      // tree parent node will use header property
      // tree child node will use items property

      // you can also change header and items variable name , but then you have change
      // this variabale in tree attributes value.
      treeData: [
        // {
        //     header: 'Ware House 1', key:'id_21', items: [
        //         { header: 'WH Category 1', key:'id_22', items: [
        //             { header: 'Item 1.1', key:'id_23' },
        //             { header: 'Item 1.2', key:'id_24' },
        //             { header: 'Item 1.3', key:'id_25' }
        //         ] },
        //         { header: 'WH Category 2', key:'id_26', items: [
        //             { header: 'Item 1.1', key:'id_27' },
        //             { header: 'Item 1.2', key:'id_28' },
        //             { header: 'Item 1.3', key:'id_29' }
        //         ] },
        //         { header: 'Item 1.1', key:'id_30' }
        //     ]
        // }
      ],
      RefreshTreeData: [
        // {
        //     header: 'Ware House 1', key:'id_1', items: [
        //         { header: 'WH Category 1', key:'id_2', items: [
        //             { header: 'Item 1.1', key:'id_3' },
        //             { header: 'Item 1.2', key:'id_4' },
        //             { header: 'Item 1.3', key:'id_5' }
        //         ] },
        //         { header: 'WH Category 2', key:'id_6', items: [
        //             { header: 'Item 1.1', key:'id_7' },
        //             { header: 'Item 1.2', key:'id_8' },
        //             { header: 'Item 1.3', key:'id_9' }
        //         ] },
        //         { header: 'Item 1.3', key:'id_10' }
        //     ]
        // }
      ],
      treeData2: [
        // {
        //     header2: 'Shop',key:'id_11', items2: [
        //         { header2: 'S Category',key:'id_12', items2: [
        //             { header2: 'Item 1.1',key:'id_13' },
        //             { header2: 'Item 1.2',key:'id_14' },
        //             { header2: 'Item 1.3',key:'id_15' }
        //         ] },
        //         { header2: 'S Category',key:'id_16', items2: [
        //             { header2: 'Item 1.1' ,key:'id_17'},
        //             { header2: 'Item 1.2',key:'id_18' },
        //             { header2: 'Item 1.3',key:'id_19' }
        //         ] },
        //         { header2: 'Item 1.3',key:'id_20' }
        //     ]
        // }
      ],
      allowDraggingParentNodes: true,
      allowDroppingIntoEmpty: true,
    };
  }

  OrignalWareHouseTreeData;
  response_nodes = [];
  server_url = "https://warehouse-22.herokuapp.com";
  UpdatedShopData;
  componentDidMount() {
    this.loadInitialShopData();
    this.loadInitialWarehouseData();
    this.setState({});
    // on runnuing this component
    // here on getting data from db
    // save ware house info in State variable(TreeData and RefreshTreeData)
    // And save shop info in State variable treeData2
    // this.OrignalWareHouseTreeData=this.getRefreshTreeData();
  }
  saveMappings() {
    // updated shop data
    console.log(this.UpdatedShopData);
    // orignal ware house data
    console.log(this.state.treeData);
    console.log(this.state.RefreshTreeData);
    this.loadInitialShopData();
    this.loadInitialWarehouseData();
    let selected_nodes = this.response_nodes;
    axios
      .post(this.server_url + "/api/trees/shops", { selected_nodes })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });

    this.response_nodes = [];
  }
  refreshWareHouse() {
    // this.OrignalWareHouseTreeData=this.state.RefreshTreeData;
    if (localStorage.getItem("RefreshTreeData")) {
      this.setState({
        treeData: JSON.parse(localStorage.getItem("RefreshTreeData")),
      });
    }

    //     // ,()=>{
    //     // this.setState({RefreshTreeData:this.state.treeData})
    // console.log(this.OrignalWareHouseTreeData)
    // console.log(this.state.RefreshTreeData)
    // console.log(this.state.treeData)
  }
  render() {
    return (
      <div
        className="container-fluid"
        style={{
          paddingLeft: "8%",
          paddingRight: "8%",
          paddingTop: "60px",
          paddingBottom: "60px",
        }}
      >
        <div className="row" style={{ height: "600px" }}>
          <div
            className="col-lg-5 col-md-5 col-sm-5"
            style={{
              padding: "5%",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <h3>Ware Houses and products</h3>
            <button
              type="button"
              className="btn btn-warning"
              onClick={this.refreshWareHouse.bind(this)}
            >
              Click Refresh WareHouse Products To Become Orignal
            </button>
            <wjNav.TreeView
              className="custom-tree"
              itemsSource={this.state.treeData}
              displayMemberPath="header"
              childItemsPath="items"
              allowDragging={true}
              dragStart={this.on_Drag_Start_From_WareHouse_Data.bind(this)}
              dragOver={this.on_Drag_Over_Between_WareHouse.bind(this)}
              initialized={this.initialized2.bind(this)}
              lazyLoadFunction={this.warehouseLazyLoad.bind(this)}
            ></wjNav.TreeView>
          </div>
          <div
            className="col-lg-2 col-md-2 col-sm-2"
            style={{ textAlign: "center" }}
          >
            <button
              type="button"
              className="btn btn-success"
              onClick={this.saveMappings.bind(this)}
            >
              Save Mappings
            </button>
            <img
              src={arrowImage}
              alt="Mapping"
              height={"40%"}
              width={"80%"}
              style={{ paddingTop: "80%" }}
            />
          </div>
          <div
            className="col-lg-5 col-md-5 col-sm-5"
            style={{
              padding: "5%",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <h3>Shops</h3>
            <button
              id="btnRemove"
              className="btn btn-warning"
              onClick={this.onRemoveClick.bind(this)}
            >
              Remove Selected Node
            </button>
            <wjNav.TreeView
              className="custom-tree"
              itemsSource={this.state.treeData2}
              displayMemberPath="header"
              childItemsPath="items"
              allowDragging={true}
              dragEnd={this.on_Drag_End_Toward_Shop_Data.bind(this)}
              dragOver={this.on_Drag_Over_Between_WareHouse_And_Shop.bind(this)}
              selectedItemChanged={this.onSelectedItemChanged.bind(this)}
              initialized={this.initialized.bind(this)}
              lazyLoadFunction={this.shopLazyLoad.bind(this)}
            ></wjNav.TreeView>
          </div>
        </div>
      </div>
    );
  }

  initTreeView(ctl) {
    this._wjTreeViewControl = ctl;
  }
  initialized(control) {
    this._control = control;
    this._control.selectedItem = this._control.itemsSource[0];
  }
  initialized2(control) {
    this._control = control;
    this._control.selectedItem = this._control.itemsSource[0];
  }
  onSelectedItemChanged() {
    var btn = document.getElementById("btnRemove");
    wjCore.setAttribute(
      btn,
      "disabled",
      this._control.selectedItem ? null : "disabled"
    );
  }
  onRemoveClick() {
    var control = this._control;
    if (control.selectedItem) {
      // find the array that contains the item to be removed
      var parent = control.selectedNode.parentNode;
      var arr = parent
        ? parent.dataItem[control.childItemsPath]
        : control.itemsSource;
      // remove the item from the parent collection
      var index = arr.indexOf(control.selectedItem);
      arr.splice(index, 1);
      // refresh the tree
      control.loadTree();
    }
  }
  getRefreshTreeData() {
    return this.state.RefreshTreeData;
  }
  onCustomCSSClick(e) {
    wjCore.toggleClass(
      this._wjTreeViewControl.hostElement,
      "custom-tree",
      e.target.checked
    );
    this.setState({
      customCSS: true,
    });
  }
  on_Drag_End_Toward_Shop_Data(s, e) {
    console.log(s);
    this.setState({
      treeData: JSON.parse(localStorage.getItem("RefreshTreeData")),
    });
    this.UpdatedShopData = s.itemsSource;
    this.setState({ treeData2: this.UpdatedShopData });
    // console.log(this.getRefreshTreeData())
    // this.OrignalWareHouseTreeData=[]
    // this.OrignalWareHouseTreeData.push(this.getRefreshTreeData())
    // console.log(this.OrignalWareHouseTreeData)
    // this.setState({treeData:this.OrignalWareHouseTreeData[0]},function(){
    //     console.log(this.state.treeData);
    // });
    let response_node = JSON.parse(JSON.stringify(s.selectedNode.dataItem));
    response_node.parent = null;
    if (s.selectedNode.parentNode) {
      response_node.parent = s.selectedNode.parentNode.dataItem;
    }
    this.response_nodes.push(response_node);
    console.log(this.response_nodes);
  }
  on_Drag_Start_From_WareHouse_Data(s, e) {
    console.log(s.itemsSource);
    localStorage.setItem("RefreshTreeData", JSON.stringify(s.itemsSource));
    // console.log(e.node.parentNode.itemsSource)
    // console.log(e.node.parentNode.dataItem)
    // console.log(e.node.parentNode.element)
    if (e && e.node && e.node.hasChildren) {
      e.node.isCollapsed = true; // collapse parent nodes when dragging
    }
  }

  on_Drag_Over_Between_WareHouse_And_Shop(s, e) {
    var t1 = e.dragSource.treeView;
    var t2 = e.dropTarget.treeView;
    //
    // prevent dragging within trees
    if (t1 === t2) {
      e.cancel = true;
    }
    //
    // allow dragging between trees
    if (t1 !== t2) {
      e.cancel = false;
    }
  }
  on_Drag_Over_Between_WareHouse(s, e) {
    var t1 = e.dragSource.treeView;
    var t2 = e.dropTarget.treeView;
    //
    // prevent dragging within trees
    if (t1 === t2) {
      e.cancel = true;
    }
    //
    // allow dragging between trees
    if (t1 !== t2) {
      e.cancel = true;
    }
  }
  setAllowDrag1() {
    this.setState({ allowDrag1: !this.state.allowDrag1 });
  }
  setAllowDrag2() {
    this.setState({ allowDrag2: !this.state.allowDrag2 });
  }

  loadInitialShopData() {
    var base_url = this.server_url + "/api/trees/shops";
    axios.get(base_url + "?page=1&limit=30").then((res) => {
      let data = res.data.data.results;
      let tree_data = data.map((elem) => {
        let json = {};
        if (elem.type === "category") {
          json.header = elem.name;
          json.key = elem._id;
          json.type = elem.type;
          json.items = [];
        } else if (elem.type === "productCategory") {
          json.header = elem.warehouse_product.title;
          json.key = elem.warehouse_product._id;
          json.type = elem.warehouse_product.type;
        }
        return json;
      });
      this.setState({ treeData2: tree_data });
    });
  }

  loadInitialWarehouseData() {
    var base_url = this.server_url + "/api/trees/warehouses";
    axios.get(base_url + "?page=1&limit=30").then((res) => {
      let data = res.data.data.results;
      let tree_data = data.map((elem) => {
        let json = {};
        if (elem.type === "warehouse") {
          json.header = elem.name;
          json.key = elem._id;
          json.type = elem.type;
          json.items = [];
        }
        //  else if (elem.type === 'productCategory') {
        //     json.header2 = elem.warehouse_product.title;
        //     json.key = elem.warehouse_product._id;
        //     json.type = elem.warehouse_product.type;
        // }
        console.log(json);
        return json;
      });
      this.setState({ treeData: tree_data, RefreshTreeData: tree_data });
    });
  }
  shopLazyLoad(node, callback) {
    var base_url = this.server_url + "/api/trees/shops";

    var url = base_url + "?page=1&limit=30&parent=" + String(node.dataItem.key);
    axios.get(url).then((res) => {
      let data = res.data.data.results;
      let tree_data = data.map((elem) => {
        let json = {};
        if (elem.type === "category") {
          json.header = elem.name;
          json.key = elem._id;
          json.type = elem.type;
          json.items = [];
        } else if (elem.type === "productCategory") {
          json.header = elem.warehouse_product.title;
          json.key = elem.warehouse_product._id;
          json.type = elem.warehouse_product.type;
        }
        return json;
      });
      callback(tree_data);
    });
  }

  warehouseLazyLoad(node, callback) {
    var base_url = this.server_url + "/api/trees/warehouses";
    var url = "";
    if (node.level === 0) {
      url =
        base_url + "?page=1&limit=30&warehouse=" + String(node.dataItem.key);
    } else {
      url =
        base_url +
        "?page=1&limit=30&parent=" +
        String(node.dataItem.key) +
        "&warehouse=" +
        String(node.dataItem.warehouse);
    }

    axios.get(url).then((res) => {
      let data = res.data.data.results;
      let tree_data = data.map((elem) => {
        let json = {};
        if (elem.type === "category") {
          json.warehouse = elem.warehouse;
        }
        if (elem.type === "category" || elem.type === "warehouse") {
          json.header = elem.name;
          json.key = elem._id;
          json.type = elem.type;
          json.items = [];
        } else if (elem.type === "productCategory") {
          json.header = elem.warehouse_product.title;
          json.key = elem.warehouse_product._id;
          json.type = elem.warehouse_product.type;
        }
        return json;
      });
      this.setState({ RefreshTreeData: node.itemsSource });
      callback(tree_data);
    });
  }
}

export default Mappings;
