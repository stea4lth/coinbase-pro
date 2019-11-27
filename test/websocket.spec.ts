import {
  WebsocketClient,
  WsUri,
  SandboxWsUri,
  DefaultChannels,
  DefaultProductIds
} from "../index";
import * as assert from "assert";
import { Port } from "./lib/wss";

const port = Port;
const wsUri = "ws://localhost:" + port;
const websocket = new WebsocketClient({ wsUri });

suite("WebsocketClient", () => {
  test("constructor", () => {
    assert.deepStrictEqual(websocket.channels, DefaultChannels);
    assert.deepStrictEqual(websocket.product_ids, DefaultProductIds);
    assert.deepStrictEqual(websocket.wsUri, wsUri);
    assert.deepStrictEqual(websocket.key, undefined);
    assert.deepStrictEqual(websocket.secret, undefined);
    assert.deepStrictEqual(websocket.passphrase, undefined);
  });

  test("constructor (with sandbox flag)", () => {
    const websocket = new WebsocketClient({ sandbox: true });
    assert.deepStrictEqual(websocket.channels, DefaultChannels);
    assert.deepStrictEqual(websocket.product_ids, DefaultProductIds);
    assert.deepStrictEqual(websocket.wsUri, SandboxWsUri);
    assert.deepStrictEqual(websocket.key, undefined);
    assert.deepStrictEqual(websocket.secret, undefined);
    assert.deepStrictEqual(websocket.passphrase, undefined);
  });

  test("constructor (with api key)", () => {
    const key = "key";
    const secret = "secret";
    const passphrase = "passphrase";
    const channels = [
      "level2",
      "heartbeat",
      {
        name: "ticker",
        product_ids: ["ETH-BTC", "ETH-USD"]
      }
    ];
    const product_ids = ["ETH-USD", "ETH-EUR"];
    const websocket = new WebsocketClient({
      key,
      secret,
      passphrase,
      channels,
      product_ids
    });
    assert.deepStrictEqual(websocket.channels, channels);
    assert.deepStrictEqual(websocket.product_ids, product_ids);
    assert.deepStrictEqual(websocket.wsUri, WsUri);
    assert.deepStrictEqual(websocket.key, key);
    assert.deepStrictEqual(websocket.secret, secret);
    assert.deepStrictEqual(websocket.passphrase, passphrase);
  });
});
