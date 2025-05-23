module vault::simple_vault {
    use sui::coin::{Self, Coin};
    use sui::balance::{Self, Balance};
    use sui::event;

    /// Error codes
    const EInsufficientBalance: u64 = 1;


    /// The main vault object that stores coins
    public struct Vault<phantom T> has key {
        id: UID,
        balance: Balance<T>,
    }

    /// Event emitted when coins are deposited
    public struct DepositEvent has copy, drop {
        vault_id: ID,
        depositor: address,
        amount: u64,
    }

    /// Event emitted when coins are withdrawn
    public struct WithdrawEvent has copy, drop {
        vault_id: ID,
        recipient: address,
        amount: u64,
    }

    /// Creates a new vault
    public fun create<T>(ctx: &mut TxContext): ID {
        let id = object::new(ctx);
        let vault_id = object::uid_to_inner(&id);
    

        // Create vault with empty balance
        let vault = Vault<T> {
            id,
            balance: balance::zero(),
        };

        transfer::share_object(vault);
        vault_id
    }

    /// Deposit coins into the vault
    public fun deposit<T>(vault: &mut Vault<T>, coin: Coin<T>, ctx: &mut TxContext) {
        let coin_value = coin::value(&coin);
        let coin_balance = coin::into_balance(coin);
        
        // Add to vault balance
        balance::join(&mut vault.balance, coin_balance);
        
        // Emit deposit event
        event::emit(DepositEvent {
            vault_id: object::id(vault),
            depositor: tx_context::sender(ctx),
            amount: coin_value,
        });
    }

    /// Withdraw coins from the vault (only callable by vault owner)
    public fun withdraw<T>(
        vault: &mut Vault<T>, 
        amount: u64, 
        ctx: &mut TxContext
    ): Coin<T> {
        // Verify the capability matches this vault
        // Verify there's enough balance
        assert!(balance::value(&vault.balance) >= amount, EInsufficientBalance);
        
        // Take specified amount from the vault
        let withdrawn_balance = balance::split(&mut vault.balance, amount);
        let coin = coin::from_balance(withdrawn_balance, ctx);
        
        // Emit withdraw event
        event::emit(WithdrawEvent {
            vault_id: object::id(vault),
            recipient: tx_context::sender(ctx),
            amount,
        });
        
        coin
    }

    /// Get the balance of the vault
    public fun balance<T>(vault: &Vault<T>): u64 {
        balance::value(&vault.balance)
    }
}