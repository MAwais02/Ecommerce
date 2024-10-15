import React from "react";
import './slider.css';
import { Link } from "react-router-dom";

import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";

// Import logo image
// import logo from "../../images/logo.png";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/">
                <span>Ecommerce</span> 
            </Link>


            <Link to="/admin/dashboard">
                <p>
                    <DashboardIcon /> Dashboard
                </p>
            </Link>

            
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ImportExportIcon />}
            >
                <TreeItem nodeId="1" label="Products">
            
                    <Link to="/admin/products">
                        <TreeItem 
                            nodeId="2" 
                            label="All" 
                            icon={<PostAddIcon />}
                        />
                    </Link>

            
                    <Link to="/admin/product">
                        <TreeItem 
                            nodeId="3" 
                            label="Create" 
                            icon={<AddIcon />}
                        />
                    </Link>
                </TreeItem>
            </TreeView>

            {/* Orders Link */}
            <Link to="/admin/orders">
                <p>
                    <ListAltIcon /> Orders
                </p>
            </Link>

            {/* Users Link */}
            <Link to="/admin/users">
                <p>
                    <PeopleIcon /> Users
                </p>
            </Link>
            
            <Link to="/admin/products">
                <p>
                    <RateReviewIcon /> All Product
                </p>
            </Link>
            <Link to="/admin/product/new">
                <p>
                    <RateReviewIcon /> Create New Product
                </p>
            </Link>
        </div>
    );
};

export default Sidebar;