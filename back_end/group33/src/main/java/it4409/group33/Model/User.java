package it4409.group33.Model;

import jakarta.persistence.*;
import org.checkerframework.checker.units.qual.K;
import org.json.JSONException;
import org.json.JSONObject;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String phone;

    private String role = "user";
    @Column(nullable = false)
    private String fullName;
    @Column(nullable = false)
    private boolean isActived = true;
    @Column(nullable = false)
    private boolean deleted = false;
    private String address;

    public User(String username, String password,String fullName, String email, String phone, String address) {
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }

    public JSONObject toJSON() throws JSONException {
        JSONObject res = new JSONObject();
        res.put("username",this.username);
        res.put("email",this.email);
        res.put("phone",this.phone);
        res.put("id",this.id);
        res.put("address",this.address);
        res.put("fullname",this.fullName);
        if(isActived) {
            res.put("locked","false");
        } else {
            res.put("locked","true");
        }
        return res;
    }

    public User() {
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isActived() {
        return isActived;
    }

    public void setActived(boolean actived) {
        isActived = actived;
    }

    public String getRole() {
        return role;
    }

    public String getFullName() {
        return fullName;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }

    public String getEmail() {
        return email;
    }


}

