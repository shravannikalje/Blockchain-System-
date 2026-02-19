package com.chainsysvr.backend.controller;

import com.chainsysvr.backend.model.Block;
import com.chainsysvr.backend.model.Transaction;
import com.chainsysvr.backend.service.BlockchainService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class BlockchainController {

    private final BlockchainService blockchainService;

    public BlockchainController(BlockchainService blockchainService) {
        this.blockchainService = blockchainService;
    }

    @GetMapping("/transactions")
    public List<Transaction> getTransactions() {
        return blockchainService.getTransactions();
    }

    @PostMapping("/transactions")
    public Transaction createTransaction(@Valid @RequestBody Transaction transaction) {
        return blockchainService.addTransaction(transaction);
    }

    @GetMapping("/blocks")
    public List<Block> getBlocks() {
        return blockchainService.getBlocks();
    }

    @PostMapping("/blocks")
    public Block createBlock(@Valid @RequestBody Block block) {
        return blockchainService.addBlock(block);
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "UP", "service", "chainsys-backend");
    }
}
