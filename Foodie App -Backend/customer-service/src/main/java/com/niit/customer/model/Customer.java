package com.niit.customer.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;

@Document
public class Customer {
    @Id
    private String customerEmailId;
    private String customerName;
    @Transient
    private String password;
    private Address customerAddress;
    private String customerPhoneNum;
    @Transient
    private byte[] image;

    public Customer() {
    }

    public Customer(String customerEmailId, String customerName, String password, Address customerAddress, String customerPhoneNum, byte[] image) {
        this.customerEmailId = customerEmailId;
        this.customerName = customerName;
        this.password = password;
        this.customerAddress = customerAddress;
        this.customerPhoneNum = customerPhoneNum;
        this.image = image;
    }

    public String getCustomerEmailId() {
        return customerEmailId;
    }

    public void setCustomerEmailId(String customerEmailId) {
        this.customerEmailId = customerEmailId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Address getCustomerAddress() {
        return customerAddress;
    }

    public void setCustomerAddress(Address customerAddress) {
        this.customerAddress = customerAddress;
    }

    public String getCustomerPhoneNum() {
        return customerPhoneNum;
    }

    public void setCustomerPhoneNum(String customerPhoneNum) {
        this.customerPhoneNum = customerPhoneNum;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "customerEmailId='" + customerEmailId + '\'' +
                ", customerName='" + customerName + '\'' +
                ", password='" + password + '\'' +
                ", customerAddress=" + customerAddress +
                ", customerPhoneNum='" + customerPhoneNum + '\'' +
                ", image=" + Arrays.toString(image) +
                '}';
    }
}
