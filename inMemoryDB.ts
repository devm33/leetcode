/**
 * 
GET key - Prints the value at the specified key, or null.
SET key value - Set the value at the specified key.
UNSET key - Removes the value at the specified key.
EXISTS key - Prints true or false if the key exists in the database.
*/


class MemoryDB {
  private db = new Map<string, string>();
  private transactionMap: Array<Map<string, string | null>> = [];

  execCommands(commands: string) {
    const list = commands.split('\n');
    for (const cmd of list) {
      this.exec(cmd);
    }
  }

  /** Reads a single command and optionally logs output. */
  exec(command: string) {
    // console.log('running command: ', command);
    const args = command.trim().split(' ');
    const cmd = args[0];
    switch (cmd) {
      case 'GET':
        if (args.length !== 2) throw new Error('wrong # args for GET');
        console.log(this.get(args[1]));
        break;
      case 'SET':
        if (args.length !== 3) throw new Error('wrong # args for SET');
        this.set(args[1], args[2]);
        break;
      case 'UNSET':
        if (args.length !== 2) throw new Error('wrong # args for UNSET');
        this.unset(args[1]);
        break;
      case 'EXISTS':
        if (args.length !== 2) throw new Error('wrong # args for EXISTS');
        console.log(this.exists(args[1]));
        break;
      case 'COMMIT':
        this.commit();
        break;
      case 'ROLLBACK':
        this.rollback();
        break;
      case 'BEGIN':
        this.begin();
        break;
      default:
        throw new Error('unknown command');
    }
  }

  begin(): void {
    this.transactionMap.push(new Map<string, string | null>());
  }

  rollback(): void {
    if (this.transactionMap.length === 0) {
      throw new Error('missing transaction');
    }
    this.transactionMap.pop();
  }

  commit(): void {
    if (this.transactionMap.length === 0) {
      throw new Error('missing transaction');
    }
    const commitTransaction = this.transactionMap.pop()!;
    if (this.transactionMap.length > 0) {
      // console.log('committing to parent transaction');
      for (const [key, value] of commitTransaction.entries()) {
        this.transactionMap[this.transactionMap.length - 1].set(key, value);
      }
    } else {
      console.log('committing to db');
      for (const [key, value] of commitTransaction.entries()) {
        if (value === null) {
          this.db.delete(key);
        } else {
          this.db.set(key, value);
        }
      }
    }
  }

  get(key: string): string | null {
    if (this.transactionMap.length > 0) {
      for (let i = this.transactionMap.length - 1; i >= 0; i--) {
        const map = this.transactionMap[i];
        if (map.has(key)) {
          return map.get(key)!;
        }
      }
    }
    return this.db.get(key) ?? null;
  }

  set(key: string, value: string): void {
    if (this.transactionMap.length > 0) {
      this.transactionMap[this.transactionMap.length - 1].set(key, value);
    } else {
      this.db.set(key, value);
    }
  }

  unset(key: string): void {
    if (this.transactionMap.length > 0) {
      this.transactionMap[this.transactionMap.length - 1].set(key, null);
    } else {
      this.db.delete(key);
    }
  }

  exists(key: string): boolean {
    if (this.transactionMap.length > 0) {
      for (let i = this.transactionMap.length - 1; i >= 0; i--) {
        const map = this.transactionMap[i];
        if (map.has(key)) {
          return map.has(key)!;
        }
      }
    }
    return this.db.has(key);
  }
}

// Test case
console.log('test case');
const db = new MemoryDB();

/*
db.execCommands(`EXISTS A
SET A 123
GET A
EXISTS A
UNSET A
GET A
EXISTS A`);
*/

db.execCommands(`SET A 123
GET A
BEGIN
SET A 456
GET A
BEGIN
UNSET A
GET A
COMMIT
GET A
ROLLBACK
GET A`);