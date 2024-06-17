package it4409.group33.Controller;

import it4409.group33.Model.ChatMessage;
import it4409.group33.Repository.ChatMessageRepository;
import it4409.group33.Service.ChatMessageService;
import org.json.JSONArray;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;
import java.util.List;

import static it4409.group33.Util.TimeStamp.getTime;

@Controller
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatMessageRepository messageRepository;
    private final ChatMessageService chatMessageService;

    @Autowired
    public ChatController(SimpMessagingTemplate messagingTemplate, ChatMessageRepository messageRepository, ChatMessageService chatMessageService) {
        this.messagingTemplate = messagingTemplate;
        this.messageRepository = messageRepository;
        this.chatMessageService = chatMessageService;
    }

    @MessageMapping("/chat.sendMessage")
    @Transactional
    public void sendMessage(@Payload ChatMessage chatMessage) {
        Long receiverId = chatMessage.getReceiverId();
        if (receiverId != null) {
            chatMessage.setTimestamp(getTime());
            messageRepository.save(chatMessage);
            messagingTemplate.convertAndSendToUser(receiverId.toString(), "/queue/messages", chatMessage);
        }
    }

    @GetMapping("/messages")
    public ResponseEntity<String> getMessages(@RequestParam Long userId) {
        List<ChatMessage> chatMessages = chatMessageService.getChatMessages(1L, userId);
        JSONArray res = new JSONArray();
        try{
            for (ChatMessage c : chatMessages) {
                res.put(c.toJSON());
            }
            return new ResponseEntity<>(res.toString(),HttpStatus.OK);
        } catch (JSONException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}


