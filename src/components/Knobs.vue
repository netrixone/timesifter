<template>
    <div id="knobs" class="grid">
        <div class="form-group">
            <label for="min-time">time range:</label>
            <input type="text" id="min-time" v-model="minTimeInput" @change="setMinTime">
            -
            <input type="text" id="max-time" v-model="maxTimeInput" @change="setMaxTime">
        </div>

        <div class="form-group">
            <label for="endians">endianness:</label>
            <div id="endians" class="btn-group">
                <button class="btn btn-success"
                        v-bind:class="{ 'btn-ghost': !littleEndian }"
                        @click="setLittleEndian(true)"
                        title="little endian mode">
                    LE
                </button>
                <button class="btn btn-success"
                        v-bind:class="{ 'btn-ghost': littleEndian }"
                        @click="setLittleEndian(false)"
                        title="BIG endian mode">
                    BE
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import * as microtime from '@/lib/microtime';

    @Component
    export default class Knobs extends Vue {
        littleEndian: boolean = true;
        minTime: number = Date.UTC(new Date().getUTCFullYear() - 1, 0, 1) * 1000;
        maxTime: number = Date.UTC(new Date().getUTCFullYear() + 1, 0, 1) * 1000;
        minTimeInput: string = microtime.toISOString(this.minTime);
        maxTimeInput: string = microtime.toISOString(this.maxTime);

        setLittleEndian(littleEndian: boolean) {
            this.littleEndian = littleEndian;
        }

        setMinTime() {
        }

        setMaxTime() {
        }
    }
</script>

<style lang="scss">
    #knobs {
        clear: both;
        .form-group label {
            border-bottom: none;
        }
    }
</style>
