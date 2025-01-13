import { Room, Client } from "@colyseus/core";
import { MyRoomState, Player } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {
  maxClients = 5;

  onCreate(options: any) {
    this.setState(new MyRoomState());

    this.onMessage("updatePosition", (client, data) => {
      const player = this.state.players.get(client.sessionId);
      player.x = data.x;
      player.y = data.y;
      player.z = data.z;
    });
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, " Player has Joined!");
     // create Player instance
     const player = new Player();

     // place Player at a random position
     const FLOOR_SIZE = 4;
     player.x = -(FLOOR_SIZE/2) + (Math.random() * FLOOR_SIZE);
     player.y = 1.031;
     player.z = -(FLOOR_SIZE/2) + (Math.random() * FLOOR_SIZE);

     // place player in the map of players by its sessionId
     // (client.sessionId is unique per connection!)
     this.state.players.set(client.sessionId, player);
     
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, " Player has left!");
    this.state.players.delete(client.sessionId);
  }

  onDispose() {
    console.log("room", this.roomId, "Room Destroy!...");
  }
  

}
