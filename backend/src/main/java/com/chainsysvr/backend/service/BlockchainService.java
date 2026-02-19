package com.chainsysvr.backend.service;

import com.chainsysvr.backend.model.Block;
import com.chainsysvr.backend.model.Transaction;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class BlockchainService {

    private final List<Transaction> transactions = new ArrayList<>();
    private final List<Block> blocks = new ArrayList<>();

    public BlockchainService() {
        Block genesis = new Block();
        genesis.setIndex(1);
        genesis.setCreator("Genesis-Node");
        genesis.setNonce(1L);
        genesis.setData("Genesis Block");
        genesis.setTimestamp(Instant.now().toEpochMilli());
        genesis.setPrevHash("0x0000000000");
        genesis.setHash(randomHash());
        blocks.add(genesis);
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public List<Block> getBlocks() {
        return blocks;
    }

    public Transaction addTransaction(Transaction request) {
        Transaction tx = new Transaction();
        tx.setId("TX-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        tx.setFrom(request.getFrom());
        tx.setTo(request.getTo());
        tx.setAmount(request.getAmount());
        tx.setStatus(normalizeStatus(request.getStatus()));
        transactions.add(tx);
        return tx;
    }

    public Block addBlock(Block request) {
        Block last = blocks.get(blocks.size() - 1);

        Block block = new Block();
        block.setIndex(blocks.size() + 1);
        block.setCreator(request.getCreator());
        block.setNonce(request.getNonce());
        block.setData(request.getData());
        block.setTimestamp(Instant.now().toEpochMilli());
        block.setPrevHash(last.getHash());
        block.setHash(randomHash());

        blocks.add(block);
        return block;
    }

    private String normalizeStatus(String status) {
        if (status == null || status.isBlank()) {
            return "Pending";
        }
        return status.equalsIgnoreCase("confirmed") ? "Confirmed" : "Pending";
    }

    private String randomHash() {
        return "0x" + UUID.randomUUID().toString().replace("-", "").substring(0, 14);
    }
}
