package it4409.group33.Service;

import it4409.group33.Model.User;
import it4409.group33.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public boolean lockUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()) {
            User u = user.get();
            u.setActived(false);
            userRepository.save(u);

            Optional<User> userX = userRepository.findById(id);
            if(userX.isPresent()) {
                return !userX.get().isActived();
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    @Transactional
    public boolean unlockUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()) {
            User u = user.get();
            u.setActived(true);
            userRepository.save(u);

            Optional<User> userX = userRepository.findById(id);
            if(userX.isPresent()) {
                return userX.get().isActived();
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public boolean isActived(Long id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()) {
            return user.get().isActived();
        } else {
            return false;
        }
    }

    public String getUserNameById(Long id) {
        return userRepository.getUsernameById(id);
    }

    public String getFullNameById(Long id) {
        return userRepository.getFullNameById(id);
    }
}
