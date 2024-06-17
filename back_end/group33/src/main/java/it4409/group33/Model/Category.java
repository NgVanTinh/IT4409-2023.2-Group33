package it4409.group33.Model;


import jakarta.persistence.*;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String englishName;
    private String vietnameseName;

    public String getVietnameseName() {
        return vietnameseName;
    }
}
