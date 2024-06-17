package it4409.group33.Service;

import it4409.group33.Model.ChatMessage;
import it4409.group33.Repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ChatMessageService {

    private final ChatMessageRepository messageRepository;

    @Autowired
    public ChatMessageService(ChatMessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public List<ChatMessage> getChatMessages(Long userId1, Long userId2) {
        return messageRepository.findBySenderIdAndReceiverIdOrSenderIdAndReceiverIdOrderByTimestampAsc(
                userId1, userId2, userId2, userId1);
    }
}

