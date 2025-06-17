import { ponder } from "ponder:registry";
import {
  pulpaAccount,
  xocBaseAccount,
  transferEvent,
  xocPolygonAccount,
} from "ponder:schema";

ponder.on("PulpaTokenDev:Transfer", async ({ event, context }) => {
  const pulpaAmount = event.args.value;

  const pulpaAccountFrom = await context.db.find(pulpaAccount, {
    address: event.args.from,
  });

  const pulpaAccountTo = await context.db.find(pulpaAccount, {
    address: event.args.to,
  });

  const pulpaAccountFromBalance = pulpaAccountFrom
    ? pulpaAccountFrom.balance
    : 0n;
  const pulpaAccountFromInflow = pulpaAccountFrom
    ? pulpaAccountFrom.inflow
    : 0n;
  const pulpaAccountFromOutflow = pulpaAccountFrom
    ? pulpaAccountFrom.outflow
    : 0n;

  const pulpaAccountToBalance = pulpaAccountTo ? pulpaAccountTo.balance : 0n;
  const pulpaAccountToInflow = pulpaAccountTo ? pulpaAccountTo.inflow : 0n;
  const pulpaAccountToOutflow = pulpaAccountTo ? pulpaAccountTo.outflow : 0n;

  await context.db
    .insert(pulpaAccount)
    .values({
      address: event.args.from,
      balance: pulpaAccountFromBalance - pulpaAmount,
      inflow: pulpaAccountFromInflow,
      outflow: pulpaAccountFromOutflow + pulpaAmount,
    })
    .onConflictDoUpdate((row) => ({
      balance: row.balance - pulpaAmount,
      outflow: row.outflow + pulpaAmount,
    }));

  await context.db
    .insert(pulpaAccount)
    .values({
      address: event.args.to,
      balance: pulpaAccountToBalance + pulpaAmount,
      inflow: pulpaAccountToInflow + pulpaAmount,
      outflow: pulpaAccountToOutflow,
    })
    .onConflictDoUpdate((row) => ({
      balance: row.balance + pulpaAmount,
      inflow: row.inflow + pulpaAmount,
    }));

  // add row to "transfer_event".
  await context.db.insert(transferEvent).values({
    id: event.id,
    amount: event.args.value,
    timestamp: Number(event.block.timestamp),
    from: event.args.from,
    to: event.args.to,
  });
});

ponder.on("XocTokenDev:Transfer", async ({ event, context }) => {
  const network = context.network;
  const xocAmount = event.args.value;

  if (network.name === "base") {
    const xocAccountFrom = await context.db.find(xocBaseAccount, {
      address: event.args.from,
    });

    const xocAccountTo = await context.db.find(xocBaseAccount, {
      address: event.args.to,
    });

    const xocAccountFromBalance = xocAccountFrom ? xocAccountFrom.balance : 0n;
    const xocAccountFromInflow = xocAccountFrom ? xocAccountFrom.inflow : 0n;
    const xocAccountFromOutflow = xocAccountFrom ? xocAccountFrom.outflow : 0n;

    const xocAccountToBalance = xocAccountTo ? xocAccountTo.balance : 0n;
    const xocAccountToInflow = xocAccountTo ? xocAccountTo.inflow : 0n;
    const xocAccountToOutflow = xocAccountTo ? xocAccountTo.outflow : 0n;

    await context.db
      .insert(xocBaseAccount)
      .values({
        address: event.args.from,
        balance: xocAccountFromBalance - xocAmount,
        inflow: xocAccountFromInflow,
        outflow: xocAccountFromOutflow + xocAmount,
      })
      .onConflictDoUpdate((row) => ({
        balance: row.balance - xocAmount,
        outflow: row.outflow + xocAmount,
      }));

    await context.db
      .insert(xocBaseAccount)
      .values({
        address: event.args.to,
        balance: xocAccountToBalance + xocAmount,
        inflow: xocAccountToInflow + xocAmount,
        outflow: xocAccountToOutflow,
      })
      .onConflictDoUpdate((row) => ({
        balance: row.balance + xocAmount,
        inflow: row.inflow + xocAmount,
      }));
  }

  if (network.name === "polygon") {
    const xocAccountFrom = await context.db.find(xocPolygonAccount, {
      address: event.args.from,
    });

    const xocAccountTo = await context.db.find(xocPolygonAccount, {
      address: event.args.to,
    });

    const xocAccountFromBalance = xocAccountFrom ? xocAccountFrom.balance : 0n;
    const xocAccountFromInflow = xocAccountFrom ? xocAccountFrom.inflow : 0n;
    const xocAccountFromOutflow = xocAccountFrom ? xocAccountFrom.outflow : 0n;

    const xocAccountToBalance = xocAccountTo ? xocAccountTo.balance : 0n;
    const xocAccountToInflow = xocAccountTo ? xocAccountTo.inflow : 0n;
    const xocAccountToOutflow = xocAccountTo ? xocAccountTo.outflow : 0n;

    await context.db
      .insert(xocPolygonAccount)
      .values({
        address: event.args.from,
        balance: xocAccountFromBalance - xocAmount,
        inflow: xocAccountFromInflow,
        outflow: xocAccountFromOutflow + xocAmount,
      })
      .onConflictDoUpdate((row) => ({
        balance: row.balance - xocAmount,
        outflow: row.outflow + xocAmount,
      }));

    await context.db
      .insert(xocPolygonAccount)
      .values({
        address: event.args.to,
        balance: xocAccountToBalance + xocAmount,
        inflow: xocAccountToInflow + xocAmount,
        outflow: xocAccountToOutflow,
      })
      .onConflictDoUpdate((row) => ({
        balance: row.balance + xocAmount,
        inflow: row.inflow + xocAmount,
      }));
  }

  // add row to "transfer_event".
  await context.db.insert(transferEvent).values({
    id: event.id,
    amount: event.args.value,
    timestamp: Number(event.block.timestamp),
    from: event.args.from,
    to: event.args.to,
  });
});
