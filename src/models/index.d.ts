import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerMynotes = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Mynotes, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly notetitle?: string | null;
  readonly notedata?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMynotes = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Mynotes, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly notetitle?: string | null;
  readonly notedata?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Mynotes = LazyLoading extends LazyLoadingDisabled ? EagerMynotes : LazyMynotes

export declare const Mynotes: (new (init: ModelInit<Mynotes>) => Mynotes) & {
  copyOf(source: Mynotes, mutator: (draft: MutableModel<Mynotes>) => MutableModel<Mynotes> | void): Mynotes;
}